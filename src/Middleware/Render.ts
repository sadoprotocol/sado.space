import { Action } from "@valkyr/router";

export const render = (components: unknown): Action =>
  async function () {
    return this.render(components);
  };
