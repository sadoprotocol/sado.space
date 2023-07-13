import { Icon } from "solid-heroicons";
import { bars_3, xMark } from "solid-heroicons/solid";
import { Dynamic, Match, Switch } from "solid-js/web";

import { Hero } from "~Components/Hero";
import { GitHubIcon } from "~Components/Icons/GitHubIcon";
import { Link } from "~Components/Link";
import { Logo } from "~Components/Logo";
import { closeNavigation, isNavigationOpen, MobileNavigation, openNavigation } from "~Components/Navigation";
import { DesktopNavigation } from "~Components/Navigation/DesktopNavigation";

import { DocsController } from "./Docs.Controller";

export const DocsView = DocsController.view(({ state }) => {
  return (
    <>
      <Header />
      <Hero />
      <div class="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
        <DesktopNavigation />
        <MobileNavigation />
        <Dynamic component={state.routed} />
      </div>
    </>
  );
});

function Header() {
  return (
    <header class="sticky top-0 z-50 mx-auto flex max-w-8xl flex-wrap items-center justify-between border-b border-slate-800 bg-white bg-white px-4 py-3 shadow-md shadow-slate-900/5 transition duration-500 dark:bg-slate-900 dark:shadow-none sm:px-6 lg:px-8">
      <div class="relative flex flex-grow basis-0 items-center">
        <div class="flex items-center lg:hidden">
          <Switch>
            <Match when={isNavigationOpen()}>
              <button onClick={closeNavigation}>
                <Icon path={xMark} class="mr-4 h-[18pt] dark:text-white" />
              </button>
            </Match>
            <Match when={!isNavigationOpen()}>
              <button onClick={openNavigation}>
                <Icon path={bars_3} class="mr-4 h-[18pt] dark:text-white" />
              </button>
            </Match>
          </Switch>
        </div>
        <Link href="/" aria-label="home">
          <Logo size={36} />
        </Link>
        <Link href="/" class="ml-5 dark:text-white" aria-label="blog">
          Blog
        </Link>
        <Link href="/docs" class="ml-5 dark:text-white" aria-label="docs">
          Docs
        </Link>
      </div>
      <div class="relative flex basis-0 items-center justify-end gap-6 sm:gap-8 md:flex-grow">
        <Link href="/whitepaper" class="text-sm dark:text-white/75" aria-label="blog">
          Whitepaper
        </Link>
        <Link href="https://github.com/cmdo/valkyr" target="_blank" class="group" aria-label="GitHub">
          <GitHubIcon class="h-5 w-5 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
        </Link>
      </div>
    </header>
  );
}
