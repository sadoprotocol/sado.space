import { RouteNotFoundException } from "@valkyr/router";
import { Component, createSignal, onCleanup } from "solid-js";

import { Error404 } from "~Components/Error404";
import { Error500 } from "~Components/Error500";
import { router } from "~Services/Router";

import { RoutesSubscriber } from "./RoutesSubscriber";

export function getRoutedAppComponent() {
  const [routed, setRouted] = createSignal<{ component: Component; props: Record<string, any> }>();

  router
    .onRender((component, props = {}) => {
      setRouted({ component, props });
    })
    .onError((error) => {
      if (error instanceof RouteNotFoundException) {
        setRouted({ component: Error404, props: {} });
      } else {
        setRouted({ component: Error500, props: {} });
      }
    })
    .listen();

  return routed;
}

export function getRoutedChildComponent(routeId: string) {
  const [state, setState] = createSignal<{ component: Component; props: any }>();

  const routes = new RoutesSubscriber(routeId, setState);

  routes.resolve();
  onCleanup(() => {
    routes.destroy();
  });

  return state;
}
