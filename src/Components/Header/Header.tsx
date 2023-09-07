import { Icon } from "solid-heroicons";
import { bars_3, xMark } from "solid-heroicons/outline";
import { Match, Switch } from "solid-js";

import { DiscordIcon } from "~Components/Icons/DiscordIcon";
import { GitHubIcon } from "~Components/Icons/GitHubIcon";
import { Link } from "~Components/Link";
import { Logo } from "~Components/Logo";
import { closeNavigation, isNavigationOpen, openNavigation } from "~Components/Navigation";
import { network } from "~Services/Network";

import { HeaderController } from "./Header.Controller";

export const Header = HeaderController.view(({ state }) => {
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
        <Link
          href="/"
          class="ml-5 hidden lg:block"
          classList={() => ({
            ["dark:text-sky-500"]: state.active === "blog",
            ["dark:text-white"]: state.active !== "blog"
          })}
          aria-label="blog"
        >
          Blog
        </Link>
        <Link
          href="/docs"
          class="ml-5 hidden lg:block"
          classList={() => ({
            ["dark:text-sky-500"]: state.active === "docs",
            ["dark:text-white"]: state.active !== "docs"
          })}
          aria-label="docs"
        >
          Docs
        </Link>
        <Link
          href="https://explorer.sado.space/"
          target="_self"
          class="ml-5 hidden dark:text-white lg:block"
          aria-label="explore"
        >
          Explore
        </Link>
      </div>
      <div class="-my-5 mr-6 hidden sm:mr-8 md:mr-0 lg:block">
        <div class="flex">
          <select
            class="mr-2 rounded-lg border-slate-700/50 bg-slate-800 text-sm dark:text-slate-400"
            value={network.current()}
            onChange={setNetwork}
          >
            <option value="mainnet">Mainnet</option>
            <option value="testnet">Testnet</option>
            <option value="regtest">Regtest</option>
          </select>
          <form
            class="group flex h-6 w-6 items-center justify-center sm:justify-start md:h-auto md:w-80 md:flex-none md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-300 dark:md:bg-slate-800 dark:md:ring-inset dark:md:ring-white/5 dark:md:hover:bg-slate-700/40 dark:md:hover:ring-slate-500 lg:w-96"
            onSubmit={goToExplorer}
          >
            <input
              class="w-full bg-transparent focus:outline-none md:mr-2 md:text-slate-500 md:dark:text-slate-400"
              placeholder="Search by transaction hash, or address"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              class="h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 md:group-hover:fill-slate-400"
            >
              <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z"></path>
            </svg>
          </form>
        </div>
      </div>
      <div class="relative flex basis-0 items-center justify-end gap-6 rounded-md sm:gap-8 md:flex-grow">
        <Link href="https://discord.gg/gf25RV5N" target="_blank" class="group flex" aria-label="Discord">
          <DiscordIcon class="h-6 w-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
        </Link>
        <Link
          href="https://github.com/orgs/sadoprotocol/repositories"
          target="_blank"
          class="group"
          aria-label="GitHub"
        >
          <GitHubIcon class="h-5 w-5 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
        </Link>
      </div>
    </header>
  );
});

function setNetwork(event: any) {
  event.preventDefault();
  network.set(event.target.value);
}

function goToExplorer(event: any) {
  event.preventDefault();
  const input = event.target.querySelector("input") as HTMLInputElement;
  if (input.value) {
    location.href = `https://explorer.sado.space/search?query=${input.value}&network=${network.current()}`;
  }
}
