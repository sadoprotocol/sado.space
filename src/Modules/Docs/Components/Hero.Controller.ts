import { Controller } from "@valkyr/solid";

import { router } from "~Services/Router";

import { config } from "../Config";

export class HeroController extends Controller<{
  show: boolean;
  description: string;
}> {
  async onInit() {
    this.setState({
      show: router.location.pathname === "/",
      description: config.hero.description
    });
    this.setSubscription({
      show: router.subscribe(() => {
        this.setState("show", router.location.pathname === "/");
      })
    });
  }
}
