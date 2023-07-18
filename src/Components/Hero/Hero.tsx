import { Show } from "solid-js";

import { HeroController } from "./Hero.Controller";

export const Hero = HeroController.view(({ state }) => {
  return (
    <Show when={state.show}>
      <div class="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
        <div class="py-16">
          <div class="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4">
            <div class="relative z-10 text-center">
              <div class="relative">
                <p class="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-4xl tracking-tight text-transparent sm:text-5xl">
                  Sado Space
                </p>
                <p class="mt-3 text-2xl leading-9 tracking-tight text-slate-400 sm:leading-normal">
                  Open-Source Ordinal-Aware Tools &amp; Services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
});
