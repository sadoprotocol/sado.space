import { Controller } from "@valkyr/solid";

export class HeaderController extends Controller<
  {
    isScrolled: boolean;
  },
  {
    navigation: any[];
  }
> {
  async onInit() {
    this.setState({ isScrolled: window.scrollY > 0 });
    window.addEventListener("scroll", this.#onScroll, { passive: true });
  }

  async onDestroy() {
    window.removeEventListener("scroll", this.#onScroll);
  }

  #onScroll = () => {
    this.setState({ isScrolled: window.scrollY > 0 });
  };
}
