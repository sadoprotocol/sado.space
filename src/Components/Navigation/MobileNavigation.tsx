import { Dialog, DialogPanel } from "solid-headless";
import { createSignal } from "solid-js";

import { createHeaderState } from "~Components/Header/State";
import { Link } from "~Components/Link";

import { Navigation } from "./Navigation";

export const [isNavigationOpen, setIsOpen] = createSignal(false);

export function MobileNavigation() {
  const active = createHeaderState();
  return (
    <Dialog
      isOpen={isNavigationOpen()}
      onClick={closeNavigation}
      aria-label="Navigation"
      class="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
    >
      <DialogPanel class="min-h-full w-full max-w-xs bg-white px-4 pb-12 pt-5 dark:bg-slate-900 sm:px-6">
        <h2 class="font-display font-medium text-slate-900 dark:text-white">Site Menu</h2>
        <div class="mt-3">
          <Link
            href="/"
            class="block py-2"
            classList={() => ({
              ["dark:text-sky-500"]: active() === "blog",
              ["dark:text-white"]: active() !== "blog"
            })}
            aria-label="blog"
            onClicked={closeNavigation}
          >
            Blog
          </Link>
          <Link
            href="/docs"
            class="block py-2"
            classList={() => ({
              ["dark:text-sky-500"]: active() === "docs",
              ["dark:text-white"]: active() !== "docs"
            })}
            aria-label="docs"
            onClicked={closeNavigation}
          >
            Docs
          </Link>
          <Link
            href="https://explorer.sado.space/"
            target="_self"
            class="block py-2 dark:text-white"
            aria-label="explore"
            onClicked={closeNavigation}
          >
            Explore
          </Link>
        </div>
        <Navigation class="mt-5 px-1" onNavigated={closeNavigation} />
      </DialogPanel>
    </Dialog>
  );
}

export function openNavigation() {
  setIsOpen(true);
}

export function closeNavigation() {
  setIsOpen(false);
}
