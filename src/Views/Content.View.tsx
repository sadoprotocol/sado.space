import { Show } from "solid-js/web";

import { Link } from "~Components/Link";
import { Prose } from "~Components/Prose";

import { ContentController } from "./Content.Controller";

export const ContentView = ContentController.view(({ state }) => {
  return (
    <Show when={state.content !== undefined}>
      <div class="min-h-screen min-w-0 max-w-2xl flex-auto px-4 py-12 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
        <article>
          {(state.title || state.section) && (
            <header class="mb-9 space-y-1">
              {state.section && <p class="font-display text-sm font-medium text-sky-500">{state.section.title}</p>}
              {state.title && (
                <h1 class="font-display text-3xl tracking-tight text-slate-900 dark:text-white">{state.title}</h1>
              )}
            </header>
          )}
          <Prose>{state.content}</Prose>
        </article>
        <dl class="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
          {state.previousPage && (
            <div>
              <dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Previous</dt>
              <dd class="mt-1">
                <Link
                  href={state.previousPage.href}
                  class="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                >
                  <span aria-hidden="true">&larr;</span> {state.previousPage.title}
                </Link>
              </dd>
            </div>
          )}
          {state.nextPage && (
            <div class="ml-auto text-right">
              <dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Next</dt>
              <dd class="mt-1">
                <Link
                  href={state.nextPage.href}
                  class="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                >
                  {state.nextPage.title} <span aria-hidden="true">&rarr;</span>
                </Link>
              </dd>
            </div>
          )}
        </dl>
      </div>
      <div class="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-10 xl:pr-6">
        <nav aria-labelledby="on-this-page-title" class="w-56">
          {state.tableOfContents.length > 0 && (
            <>
              <h2 id="on-this-page-title" class="font-display text-sm font-medium text-slate-900 dark:text-white">
                On this page
              </h2>
              <ol role="list" class="mt-4 space-y-3 text-sm">
                {state.tableOfContents.map((section) => (
                  <li>
                    <h3>
                      <Link
                        href={`#${section.id}`}
                        class={
                          "font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                        }
                      >
                        {section.title}
                      </Link>
                    </h3>
                    {section.children.length > 0 && (
                      <ol role="list" class="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">
                        {section.children.map((subSection) => (
                          <li>
                            <Link href={`#${subSection.id}`} class="hover:text-slate-600 dark:hover:text-slate-300">
                              {subSection.title}
                            </Link>
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ol>
            </>
          )}
        </nav>
      </div>
    </Show>
  );
});
