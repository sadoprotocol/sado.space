import { Show } from "solid-js";

import { Link } from "~Atoms/Link/Link.Component";

import { config } from "../Config";
import { HeroController } from "./Hero.Controller";

export const Hero = HeroController.view(({ state }) => {
  return (
    <Show when={state.show}>
      <div class="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
        <div class="py-8">
          <div class="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4">
            <div class="relative z-10 text-center">
              <div class="relative">
                <p class="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-4xl tracking-tight text-transparent sm:text-5xl">
                  {config.hero.title}
                </p>
                <p class="mt-3 text-2xl leading-9 tracking-tight text-slate-400 sm:leading-normal">
                  {config.hero.description}
                </p>
                <div class="mt-8 flex justify-center gap-4">
                  <Link
                    href="/demo"
                    class="w-1/5 rounded-full bg-sky-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500"
                  >
                    Demo
                  </Link>
                  <Link
                    href="https://github.com/sadoprotocol"
                    target="_blank"
                    class="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400"
                  >
                    View on GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
});
