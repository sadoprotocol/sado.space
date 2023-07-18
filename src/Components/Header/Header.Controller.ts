import { Controller } from "@valkyr/solid";

import { router } from "~Services/Router";

export class HeaderController extends Controller<{
  path: string;
}> {
  async onInit() {
    this.#setState();
    this.setSubscription({
      path: router.subscribe(this.#setState)
    });
  }

  #setState = () => {
    const path = router.history.location.pathname;
    this.setState({ path });
  };
}
