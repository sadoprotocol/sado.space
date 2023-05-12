import { Dialog, DialogPanel } from "solid-headless";
import { createSignal } from "solid-js";

import { Link } from "~Components/Atoms/Link/Link.Component";

import { config } from "../Config";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

function MenuIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" {...props}>
      <path d="M5 5l14 14M19 5l-14 14" />
    </svg>
  );
}

export function MobileNavigation({ navigation }) {
  const [isOpen, setIsOpen] = createSignal(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal} class="relative" aria-label="Open navigation">
        <MenuIcon class="h-6 w-6 stroke-slate-500" />
      </button>
      <Dialog
        isOpen={isOpen()}
        onClose={closeModal}
        class="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
        aria-label="Navigation"
      >
        <DialogPanel class="min-h-full w-full max-w-xs bg-white px-4 pb-12 pt-5 dark:bg-slate-900 sm:px-6">
          <div class="flex items-center">
            <button type="button" onClick={closeModal} aria-label="Close navigation">
              <CloseIcon class="h-6 w-6 stroke-slate-500" />
            </button>
            <Link href={config.landing} class="ml-6" aria-label="Home page">
              <Logo />
            </Link>
          </div>
          <Navigation navigation={navigation} class="mt-5 px-1" />
        </DialogPanel>
      </Dialog>
    </>
  );
}
