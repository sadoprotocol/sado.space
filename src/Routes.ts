import { Route } from "@valkyr/router";

import { render, renderTemplate } from "~Middleware/Render";
import { setPageTitle } from "~Middleware/SetPageTitle";
import { router } from "~Services/Router";
import { getTitleByHref } from "~Services/Utils";

import { ContentView } from "./Views/Content.View";
import { DocsView } from "./Views/Docs.View";

const APP_TITLE = "Sado";

router.register([
  new Route({
    id: "docs",
    name: "Documentation",
    path: "/",
    actions: [renderTemplate("docs", DocsView)],
    children: [
      new Route({
        id: "blog-welcome",
        name: "Welcome",
        path: "/",
        actions: [setPageTitle(APP_TITLE, getDocTitle), render(ContentView)]
      }),
      new Route({
        id: "blog-content",
        name: "Article",
        path: "/blog/:page",
        actions: [setPageTitle(APP_TITLE, getDocTitle), render(ContentView)]
      }),
      new Route({
        id: "docs-introduction",
        name: "Introduction",
        path: "/docs",
        actions: [setPageTitle(APP_TITLE, getDocTitle), render(ContentView)]
      }),
      new Route({
        id: "docs-content",
        name: "Page",
        path: "/docs/:page",
        actions: [setPageTitle(APP_TITLE, getDocTitle), render(ContentView)]
      }),
      new Route({
        id: "whitepaper-introduction",
        name: "Page",
        path: "/whitepaper",
        actions: [setPageTitle(APP_TITLE, getDocTitle), render(ContentView)]
      }),
      new Route({
        id: "whitepaper-content",
        name: "Page",
        path: "/whitepaper/:page",
        actions: [setPageTitle(APP_TITLE, getDocTitle), render(ContentView)]
      })
    ]
  })
]);

function getDocTitle(): string {
  return getTitleByHref(router.history.location.pathname, "");
}
