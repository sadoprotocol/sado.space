import { Action } from "@valkyr/router";

export const render = (components: unknown): Action =>
  async function (res) {
    return res.render(components);
  };

export const renderTemplate = (
  routeId: string,
  component: unknown
): Action<{
  routeId: string;
}> =>
  async function (res) {
    return res.render(component, { routeId });
  };
