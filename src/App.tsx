import { Show } from "solid-js";
import { Dynamic } from "solid-js/web";

import { getRoutedAppComponent } from "~Library/Routing/Utilities";

export function App() {
  const routed = getRoutedAppComponent();
  return (
    <Show when={routed()} fallback={<div>Loading ...</div>}>
      <Dynamic component={routed().component} {...routed().props} />
    </Show>
  );
}
