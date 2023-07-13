import { Controller } from "@valkyr/solid";

import { router } from "~Services/Router";

export class HeroController extends Controller<{
  show: boolean;
}> {
  async onInit() {
    this.setState({
      show: router.history.location.pathname === "/"
    });
    this.setSubscription({
      show: router.subscribe(() => {
        this.setState("show", router.history.location.pathname === "/");
      })
    });
  }
}
