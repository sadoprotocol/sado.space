import { Action, Route } from "@valkyr/router";

export const setPageTitle = (appTitle: string, getPageTitle = getDefaultPageTitle): Action =>
  async function ({ route }) {
    document.title = `${appTitle} | ${getPageTitle(route)}`;
    return this.accept();
  };

function getDefaultPageTitle(route: Route) {
  return route.name;
}
