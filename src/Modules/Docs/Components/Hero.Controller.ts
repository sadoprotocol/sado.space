import { Controller } from "@valkyr/solid";

import { router } from "~Services/Router";

import { config } from "../Config";

export class HeroController extends Controller<{
  show: boolean;
  description: string;
  code: {
    language: string;
    text: string;
    tabs: {
      name: string;
      isActive: boolean;
    }[];
  };
}> {
  async onInit() {
    this.setState({
      show: router.location.pathname === "/",
      description: config.hero.description,
      code: config.hero.code
    });
    this.setSubscriptions({
      show: router.subscribe(() => {
        this.setState("show", router.location.pathname === "/");
      })
    });
  }
}
