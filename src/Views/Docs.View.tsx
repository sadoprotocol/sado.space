import { Dynamic } from "solid-js/web";

import { Header } from "~Components/Header";
import { Hero } from "~Components/Hero";
import { MobileNavigation } from "~Components/Navigation";
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
