import { Show } from "solid-js";

import { Link } from "~Components/Atoms/Link/Link.Component";

import { CodeHighlighter } from "../Library/Components/Fence";
import { HeroController } from "./Hero.Controller";
import { HeroBackground } from "./HeroBackground";
import { HeroText } from "./HeroText";

const codeLanguage = "typescript";
const code = `export const sado = new SADO({
  network: {
    set(value: Network) {
      localStorage.setItem("network", value);
    },
    get(): Network {
      return localStorage.getItem("network");
    }
  }
});`;

const tabs = [
  { name: "sado.ts", isActive: true },
  { name: "package.json", isActive: false }
];

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  );
}
export const Hero = HeroController.view(({ state }) => {
  return (
    <Show when={state.show}>
      <div class="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
        <div class="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
          <div class="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
            <div class="relative z-10 md:text-center lg:text-left">
              <div class="absolute bottom-full right-full -mb-44 -mr-96 h-96 w-96 rounded-full bg-cyan-400 opacity-10 blur-3xl"></div>
              <div class="relative">
                <p class="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-4xl tracking-tight text-transparent sm:text-5xl">
                  <HeroText />
                </p>
                <p class="mt-3 text-2xl leading-9 tracking-tight text-slate-400 sm:leading-normal">
                  {state.description}
                </p>
                <div class="mt-8 flex gap-4 md:justify-center lg:justify-start">
                  <Link
                    href="/demo"
                    class="rounded-full bg-sky-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500"
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
            <div class="relative lg:static xl:pl-10">
              <div class="absolute inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
                <HeroBackground class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
              </div>
              <div class="relative">
                <div class="absolute -right-64 -top-64 h-[530px] w-[530px] rounded-full bg-cyan-400 opacity-10 blur-3xl"></div>
                <div class="absolute -bottom-20 -right-44 h-[567px] w-[567px] rounded-full bg-cyan-400 opacity-10 blur-3xl"></div>
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" />
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10" />
                <div class="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur">
                  <div class="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" />
                  <div class="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />
                  <div class="pl-4 pt-4">
                    <TrafficLightsIcon class="h-2.5 w-auto stroke-slate-500/30" />
                    <div class="mt-4 flex space-x-2 text-xs">
                      {tabs.map((tab) => (
                        <div
                          classList={{
                            "flex h-6 rounded-full": true,
                            "bg-gradient-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px font-medium text-sky-300":
                              tab.isActive,
                            "text-slate-500": !tab.isActive
                          }}
                        >
                          <div
                            classList={{
                              "flex items-center rounded-full px-2.5": true,
                              "bg-slate-800": tab.isActive
                            }}
                          >
                            {tab.name}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div class="flex items-start px-1 text-sm">
                      <div
                        aria-hidden="true"
                        class="select-none pr-1 font-mono text-slate-600"
                        style="padding-top:1.3rem"
                      >
                        {Array.from({
                          length: code.split("\n").length
                        }).map((_, index) => (
                          <div style="line-height:1.51">{(index + 1).toString().padStart(2, "0")}</div>
                        ))}
                      </div>
                      <CodeHighlighter code={code} language={codeLanguage} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
});
