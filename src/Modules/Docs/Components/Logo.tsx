import { createComponent } from "solid-js";

import { config } from "../Config";

export function Logo() {
  if (config.logo === undefined) {
    return <div class="dark:text-white">{config.name}</div>;
  }
  return createComponent(...config.logo);
}
