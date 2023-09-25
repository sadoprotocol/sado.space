import { type Resolved, response, type Route } from "@valkyr/router";

import { router } from "~Services/Router";

export class RoutesSubscriber {
  readonly #routes: string[] = [];
  readonly #parents: string[] = [];

  #subscription?: any;
  #parent?: string;

  constructor(readonly routeId: string, readonly setState: (state: any) => void) {
    const parent = router.getRouteById(routeId);
    if (parent === undefined) {
      throw new Error(`ControllerRoutes Exception: Template route for ${routeId} was not found`);
    }
    this.#resolveRoutePaths(parent);
  }

  /*
   |--------------------------------------------------------------------------------
   | Bootstrap & Teardown
   |--------------------------------------------------------------------------------
   */

  async resolve(): Promise<void> {
    this.#subscription?.unsubscribe();

    // ### Subscriber

    this.#subscription = router.subscribe(async (resolved) => {
      if (this.#routes.includes(resolved.route.path) === true) {
        const result = await this.#getRender(resolved);
        if (result !== undefined) {
          this.#parent = undefined; // direct child should reset parent container
          return this.setState({
            component: result.component,
            props: result.props
          });
        }
      }
      for (const path of this.#parents) {
        if (resolved.route.path.includes(path)) {
          if (this.#parent === path) {
            return; // parent is already loaded, do not re-render the container
          }
          this.#parent = path;
          return this.#resolvePath(path);
        }
      }
    });
  }

  async destroy(): Promise<void> {
    this.#subscription?.unsubscribe();
  }

  /*
   |--------------------------------------------------------------------------------
   | Utilities
   |--------------------------------------------------------------------------------
   */

  #resolveRoutePaths(parent: Route) {
    for (const route of parent.children ?? []) {
      this.#routes.push(route.path);
      if (route.children !== undefined) {
        this.#parents.push(route.path);
      }
    }
  }

  async #resolvePath(path: string) {
    const resolved = router.resolve(path);
    if (resolved !== undefined) {
      const view = await this.#getRender(resolved);
      if (view !== undefined) {
        this.setState({
          component: view.component,
          props: view.props,
          $path: () => resolved.route.path
        });
      }
    }
  }

  async #getRender(resolved: Resolved) {
    for (const action of resolved.route.actions) {
      const res = await action(response);
      switch (res.status) {
        case "render": {
          const params = resolved.params.get() ?? {};
          const query = resolved.query.get() ?? {};
          return {
            id: resolved.route.id,
            name: resolved.route.name,
            location: router.history.location,
            component: res.component,
            props: {
              path: router.history.location.pathname,
              ...res.props,
              ...params,
              ...query
            }
          };
        }
      }
    }
  }
}
