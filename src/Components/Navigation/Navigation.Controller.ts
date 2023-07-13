import { Controller } from "@valkyr/solid";

import { router } from "~Services/Router";

import { getNavigationByLocation, NavigationCategory } from "../../Navigation";

export class NavigationController extends Controller<
  {
    path: string;
    navigation: NavigationCategory[];
  },
  {
    class?: string;
    onNavigated?: () => void;
  }
> {
  async onInit() {
    this.#setState();
    this.setSubscription({
      path: router.subscribe(this.#setState)
    });
  }

  #setState = () => {
    const path = router.history.location.pathname;
    this.setState({
      path,
      navigation: getNavigationByLocation()
    });
  };
}
