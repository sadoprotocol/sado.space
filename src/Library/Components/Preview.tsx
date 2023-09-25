import { children, createSignal, For, Show } from "solid-js";

export function Preview({ children: c, tabs }) {
  const [activeIndex, setActiveIndex] = createSignal(0);
  return (
    <div>
      <div aria-label="Tabs" role="tablist" class="flex rounded-t-md bg-slate-700/[.6] text-center">
        <For each={tabs}>
          {(tab, index) => {
            return (
              <button
                type="button"
                aria-controls={`tabpanel-${index()}`}
                aria-selected={index() === activeIndex()}
                role="tab"
                tabIndex={0}
                class="flex items-center justify-center rounded-t-md px-3 py-1 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-slate-400 disabled:dark:text-slate-500"
                classList={{
                  ["bg-slate-100 text-black dark:bg-slate-800 dark:text-white"]: index() === activeIndex(),
                  ["text-slate-500 hover:bg-slate-50 hover:text-slate-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"]:
                    index() !== activeIndex()
                }}
                onClick={() => setActiveIndex(index())}
              >
                {tab}
              </button>
            );
          }}
        </For>
      </div>
      <div role="tabpanel" tabIndex={0} class="rounded-b-md bg-slate-800">
        <For each={children(() => c).toArray()}>
          {(child, index) => {
            return <Show when={index() === activeIndex()}>{child}</Show>;
          }}
        </For>
      </div>
    </div>
  );
}

export function PreviewSection(props: any) {
  return <section>{props.children}</section>;
}
