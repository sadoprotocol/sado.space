/* @refresh reload */

import "./Routes";

import { controllers } from "@valkyr/solid";
import { createComponent } from "solid-js";
import { render } from "solid-js/web";

import { ControllerLoader } from "~Components/Loader";
import { router } from "~Services/Router";

let currentComponent: () => void | undefined;

/*
 |--------------------------------------------------------------------------------
 | Application Start
 |--------------------------------------------------------------------------------
 */

router
  .onRender((component, props = {}) => {
    currentComponent?.();
    currentComponent = render(() => createComponent(component, props), document.body);
  })
  .onError((error) => {
    console.error(error);
  })
  .listen();

/*
 |--------------------------------------------------------------------------------
 | Controller Defaults
 |--------------------------------------------------------------------------------
 */

controllers.loading = ControllerLoader;
