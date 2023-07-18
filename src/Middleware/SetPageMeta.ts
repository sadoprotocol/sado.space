import { Action, Route } from "@valkyr/router";

import { router } from "~Services/Router";

export const setPageMeta = (appTitle: string, getPageTitle = getDefaultPageTitle): Action =>
  async function (res) {
    document.title = `${appTitle} | ${getPageTitle(router.route)}`;
    document.querySelector("meta[property='og:url']")?.setAttribute("content", window.location.href);
    return res.accept();
  };

function getDefaultPageTitle(route: Route) {
  return route.name;
}
