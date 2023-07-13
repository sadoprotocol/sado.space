import { Action, Route } from "@valkyr/router";

import { router } from "~Services/Router";

export const setPageTitle = (appTitle: string, getPageTitle = getDefaultPageTitle): Action =>
  async function (res) {
    document.title = `${appTitle} | ${getPageTitle(router.route)}`;
    return res.accept();
  };

function getDefaultPageTitle(route: Route) {
  return route.name;
}
