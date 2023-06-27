import { Controller } from "@valkyr/solid";
import { ComponentProps } from "solid-js";

export class PreviewObjectController extends Controller<
  {
    show: boolean;
  },
  ComponentProps<"div"> & {
    title: string;
  }
> {
  async onInit() {
    this.setState({ show: true });
  }

  toggle() {
    this.setState({ show: !this.state.show });
  }
}
