import { Route } from "@valkyr/router";

import { render } from "~Middleware/Render";
import { setPageTitle } from "~Middleware/SetPageTitle";
import { DashboardView } from "~Modules/Demo/Views/Dashboard.View";
import { getTitleByHref } from "~Modules/Docs/Utils";
import { ContentView } from "~Modules/Docs/Views/Content.View";
import { DocsView } from "~Modules/Docs/Views/Docs.View";
import { router } from "~Services/Router";

const APP_TITLE = "SADO";

router.register([
  new Route({
    id: "docs",
    name: "Documentation",
    path: "/",
    actions: [render(DocsView)],
    children: [
      new Route({
        id: "docs-content",
        name: "Introduction",
        path: "/",
        actions: [setPageTitle(APP_TITLE, getDocTitle), render(ContentView)]
      }),
      new Route({
        id: "docs-content",
        name: "Page",
        path: "/docs/:page",
        actions: [setPageTitle(APP_TITLE, getDocTitle), render(ContentView)]
      })
    ]
  }),
  new Route({
    id: "demo",
    name: "Demo",
    path: "/demo",
    actions: [setPageTitle(APP_TITLE), render(DashboardView)]
  })
]);

function getDocTitle(): string {
  return getTitleByHref(router.location.pathname, "");
}
