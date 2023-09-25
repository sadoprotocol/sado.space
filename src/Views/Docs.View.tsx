import { Show } from "solid-js";
import { Dynamic } from "solid-js/web";

import { Header } from "~Components/Header";
import { loadPages } from "~Library/Page";
import { getRoutedChildComponent } from "~Library/Routing/Utilities";

import { MobileNavigation } from "../Components/Navigation";
import { DesktopNavigation } from "../Components/Navigation/DesktopNavigation";

export function DocsView(props: any) {
  const routed = getRoutedChildComponent(props.routeId);
  const resume = loadPages();
  return (
    <>
      <Header />
      <div class="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
        <DesktopNavigation />
        <MobileNavigation />
        <Show when={resume() && routed()}>
          <Dynamic component={routed().component} {...routed().props} />
        </Show>
      </div>
    </>
  );
}
