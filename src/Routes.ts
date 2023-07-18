import { Route } from "@valkyr/router";

import { render, renderTemplate } from "~Middleware/Render";
import { setPageMeta } from "~Middleware/SetPageMeta";
import { router } from "~Services/Router";

import { ContentView } from "./Views/Content.View";
import { DocsView } from "./Views/Docs.View";

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
        actions: [setPageMeta, render(ContentView)]
      }),
      new Route({
        id: "blog-content",
        name: "Article",
        path: "/blog/:page",
        actions: [setPageMeta, render(ContentView)]
      }),
      new Route({
        id: "docs-introduction",
        name: "Introduction",
        path: "/docs",
        actions: [setPageMeta, render(ContentView)]
      }),
      new Route({
        id: "docs-content",
        name: "Page",
        path: "/docs/:page",
        actions: [setPageMeta, render(ContentView)]
      }),
      new Route({
        id: "whitepaper-introduction",
        name: "Page",
        path: "/whitepaper",
        actions: [setPageMeta, render(ContentView)]
      }),
      new Route({
        id: "whitepaper-content",
        name: "Page",
        path: "/whitepaper/:page",
        actions: [setPageMeta, render(ContentView)]
      })
    ]
  })
]);
