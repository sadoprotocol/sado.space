import { Controller } from "@valkyr/solid";

import { router } from "~Services/Router";

import { Navigation } from "../Config";

export class NavigationController extends Controller<
  {
    path: string;
  },
  {
    navigation: Navigation[];
    class?: string;
    onNavigated?: () => void;
  }
> {
  async onInit() {
    this.setState("path", router.location.pathname);
    this.setSubscriptions({
      path: router.subscribe(() => {
        this.setState("path", router.location.pathname);
      })
    });
  }
}
