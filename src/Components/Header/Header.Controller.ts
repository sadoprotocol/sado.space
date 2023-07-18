import { Controller } from "@valkyr/solid";

import { router } from "~Services/Router";

export class HeaderController extends Controller<{
  active: "blog" | "docs";
}> {
  async onInit() {
    this.#setState();
    this.setSubscription({
      path: router.subscribe(this.#setState)
    });
  }

  #setState = () => {
    const path = router.history.location.pathname;
    if (path === "/" || path.includes("/blog")) {
      this.setState("active", "blog");
    }
    if (path.includes("/docs")) {
      this.setState("active", "docs");
    }
  };
}
