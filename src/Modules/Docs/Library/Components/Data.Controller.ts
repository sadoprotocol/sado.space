import { Controller } from "@valkyr/solid";
import { ComponentProps } from "solid-js";

export class DataController extends Controller<
  {
    show: boolean;
  },
  ComponentProps<"div"> & {
    title: string;
    show: boolean;
  }
> {
  async onInit() {
    this.setState({ show: this.props.show });
  }

  toggle() {
    this.setState({ show: !this.state.show });
  }
}
