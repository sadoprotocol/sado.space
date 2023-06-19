import { children, For, Show } from "solid-js";

import { PreviewController } from "./Preview.Controller";

export const Preview = PreviewController.view(({ props, state, actions: { setTab } }) => {
  return (
    <div>
      <div aria-label="Tabs" role="tablist" class="flex rounded-t-md bg-gray-700/[.6] text-center">
        <For each={props.tabs}>
          {(tab, index) => {
            return (
              <button
                type="button"
                aria-controls={`tabpanel-${index()}`}
                aria-selected={index() === state.activeIndex}
                role="tab"
                tabIndex={0}
                class="flex items-center justify-center rounded-t-md px-3 py-1 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500"
                classList={{
                  ["bg-gray-100 text-black dark:bg-gray-800 dark:text-white"]: index() === state.activeIndex,
                  ["text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"]:
                    index() !== state.activeIndex
                }}
                onClick={setTab(index())}
              >
                {tab}
              </button>
            );
          }}
        </For>
      </div>
      <div role="tabpanel" tabIndex={0} class="rounded-b-md bg-gray-800">
        <For each={children(() => props.children).toArray()}>
          {(child, index) => {
            return <Show when={index() === state.activeIndex}>{child}</Show>;
          }}
        </For>
      </div>
    </div>
  );
});

export function PreviewSection(props: any) {
  return <section>{props.children}</section>;
}
