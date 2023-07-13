import { Dialog, DialogPanel } from "solid-headless";
import { createSignal } from "solid-js";

import { Navigation } from "./Navigation";

export const [isNavigationOpen, setIsOpen] = createSignal(false);

export function MobileNavigation() {
  return (
    <Dialog
      isOpen={isNavigationOpen()}
      onClick={closeNavigation}
      aria-label="Navigation"
      class="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
    >
      <DialogPanel class="min-h-full w-full max-w-xs bg-white px-4 pb-12 pt-5 dark:bg-slate-900 sm:px-6">
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
