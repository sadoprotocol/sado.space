import { children, For, Match, Show, Switch } from "solid-js";

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

export function PreviewParameters(props: any) {
  return (
    <div class="mt-2 px-6 pb-8">
      <div class="font-semibold text-white">Parameters</div>
      {props.children}
    </div>
  );
}

export function PreviewParameter(props: any) {
  return (
    <div class="mt-4 border-t border-gray-600 pt-4 text-sm">
      <div>
        <span class="mr-1 inline-block font-semibold text-white">{props.name}</span>
        <Switch>
          <Match when={props.required === true}>
            <span class="mr-1 inline-block text-xs uppercase text-red-400/[.9]">required</span>
          </Match>
          <Match when={props.required === false}>
            <span class="mr-1 inline-block text-gray-300/[0.7]">optional</span>
          </Match>
        </Switch>
        <span>{props.type}</span>
      </div>
      <p class="m-0">{props.description}</p>
      <Show when={props.children().length > 0}>
        <div class="my-2 rounded-md border border-gray-600">
          <div class="text-md border-b border-gray-600 px-2 py-1">Possible values</div>
          {props.children}
        </div>
      </Show>
    </div>
  );
}

export function PreviewValue(props: any) {
  return (
    <div class="border-b border-gray-600 p-2 text-xs">
      <div class="mb-1 font-semibold text-white">{props.name}</div>
      <div>{props.description}</div>
    </div>
  );
}
