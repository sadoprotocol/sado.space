import { For } from "solid-js";

import { Link } from "~Components/Atoms/Link/Link.Component";

import { NavigationController } from "./Navigation.Controller";

export const Navigation = NavigationController.view(({ props, state }) => {
  return (
    <nav
      classList={{
        ["text-base lg:text-sm"]: true,
        [props.class]: true
      }}
    >
      <ul role="list" class="space-y-9">
        <For each={props.navigation}>
          {(section) => (
            <li>
              <h2 class="font-display font-medium text-slate-900 dark:text-white">{section.title}</h2>
              <ul
                role="list"
                class="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200"
              >
                <For each={section.links}>
                  {(link) => (
                    <li class="relative">
                      <Link
                        href={link.href}
                        classList={() => ({
                          ["block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full"]:
                            true,
                          ["font-semibold text-sky-500 before:bg-sky-500"]: state.path === link.href,
                          ["text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"]:
                            state.path !== link.href
                        })}
                        onClicked={props.onNavigated}
                      >
                        {link.title}
                      </Link>
                    </li>
                  )}
                </For>
              </ul>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
});
