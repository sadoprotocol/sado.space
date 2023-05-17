/* @refresh reload */

import "./Modules";
import "./Docs";

import { controllers } from "@valkyr/solid";
import { createComponent } from "solid-js";
import { render } from "solid-js/web";

import { ControllerLoader } from "~Molecules/ControllerLoader.Component";
import { router } from "~Services/Router";

let currentComponent: () => void | undefined;

/*
 |--------------------------------------------------------------------------------
 | Application Start
 |--------------------------------------------------------------------------------
 */

router
  .render((component, props = {}) => {
    currentComponent?.();
    currentComponent = render(() => createComponent(component, props), document.body);
  })
  .error((error) => {
    console.error(error);
  })
  .listen();

/*
 |--------------------------------------------------------------------------------
 | Controller Defaults
 |--------------------------------------------------------------------------------
 */

controllers.loading = ControllerLoader;
