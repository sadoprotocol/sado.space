import { Action } from "@valkyr/router";

import { router } from "~Services/Router";

import { getNavigationByLocation } from "../Navigation";

export const setPageMeta: Action = async function (res) {
  document.title = `${getTitleByHref(router.history.location.pathname, router.route.name)}`;
  document.querySelector("meta[property='og:url']")?.setAttribute("content", window.location.href);
  return res.accept();
};

function getTitleByHref(href: string, fallback = ""): string {
  for (const nav of getNavigationByLocation()) {
    for (const link of nav.links) {
      if (link.href === href) {
        return `${link.title} | ${nav.title}`;
      }
    }
  }
  return fallback;
}
