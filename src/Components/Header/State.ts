import { createSignal, onCleanup } from "solid-js";

import { router } from "~Services/Router";

export function createHeaderState() {
  const [active, setActive] = createSignal<"blog" | "docs">("blog");

  setActive(getActiveState());

  const subscription = router.subscribe(() => {
    setActive(getActiveState());
  });

  onCleanup(() => {
    subscription.unsubscribe();
  });

  return active;
}

function getActiveState() {
  const path = router.history.location.pathname;
  if (path === "/" || path.includes("/blog")) {
    return "blog";
  }
  if (path.includes("/docs")) {
    return "docs";
  }
}
