import { Controller } from "@valkyr/solid";
import { ComponentProps } from "solid-js";

export class PreviewController extends Controller<
  {
    activeIndex: number;
  },
  ComponentProps<"pre"> & {
    tabs: string[];
  }
> {
  async onInit() {
    this.setState({ activeIndex: 0 });
  }

  setTab(activeIndex: number): () => void {
    return () => {
      this.setState({ activeIndex });
    };
  }
}
