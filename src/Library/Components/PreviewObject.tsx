import { Icon } from "solid-heroicons";
import { chevronDown } from "solid-heroicons/solid";
import { createSignal, Match, Show, Switch } from "solid-js";

export function PreviewObject({ title, children }) {
  const [show, setShow] = createSignal(false);
  return (
    <div class="divide-y divide-slate-200 border-t border-slate-200 dark:divide-slate-700 dark:border-slate-700">
      <button
        class="flex w-full items-center justify-between px-4 py-2 text-left font-medium text-slate-500 first:rounded-t-lg last:rounded-b-lg dark:text-slate-400"
        onClick={() => setShow(!show())}
      >
        {title}
        <Icon
          path={chevronDown}
          classList={{
            ["h-6 w-6 shrink-0"]: true,
            ["rotate-180"]: show()
          }}
        />
      </button>
      <Show when={show()}>
        <div class="bg-slate-800/[0.7] p-5">{children}</div>
      </Show>
    </div>
  );
}

export function PreviewModel(props: any) {
  return (
    <div class="rounded-md bg-slate-800 px-4 py-6">
      <div>{props.children}</div>
    </div>
  );
}

const indents = {
  1: "ml-4",
  2: "ml-8",
  3: "ml-12",
  4: "ml-16"
};

export function PreviewObjectItem(props: any) {
  const depth = props.name.split(".");
  const name = depth.pop();
  const typeLink: string | undefined = props["type-link"];
  return (
    <div
      class="border-slate-300/10 pt-4 text-sm first:mt-0 first:border-none first:pt-0"
      classList={{
        ["mt-4 border-t"]: depth.length === 0,
        [indents[depth.length]]: true
      }}
    >
      <div>
        <span class="mr-1 inline-block font-semibold text-white">{name}</span>
        <Switch>
          <Match when={props.required === true}>
            <span class="mr-1 inline-block text-xs uppercase text-red-400/[.9]">required</span>
          </Match>
          <Match when={props.required === false}>
            <span class="mr-1 inline-block text-slate-300/[0.7]">optional</span>
          </Match>
        </Switch>
        <Switch>
          <Match when={typeLink === undefined}>
            <span>{props.type}</span>
          </Match>
          <Match when={typeLink !== undefined}>
            <a href={typeLink} target={`_${typeLink[0] === "#" ? "self" : "blank"}`}>
              {props.type}
            </a>
          </Match>
        </Switch>
        <Show when={props.default}>
          <span class="ml-1 text-xs italic text-gray-300/[0.6]">[ Default: {props.default} ]</span>
        </Show>
      </div>
      <p class="m-0">{props.description}</p>
      <Show when={props.children().length > 0}>
        <div class="my-2 rounded-md border border-slate-300/10">
          <div class="text-md border-b border-slate-300/10 px-2 py-1">Possible values</div>
          {props.children}
        </div>
      </Show>
      <Show when={props.note}>
        <div class="my-2 rounded-md border border-amber-900/25 p-2 text-xs text-amber-900/75 dark:border-amber-500/25 dark:text-amber-500/75">
          <strong class="text-amber-900/75 dark:text-amber-500/75">NOTE!</strong> {props.note}
        </div>
      </Show>
    </div>
  );
}

export function PreviewObjectValue(props: any) {
  return (
    <div class="border-b border-slate-600 p-2 text-xs">
      <div class="mb-1 font-semibold text-white">{props.name}</div>
      <div>{props.description}</div>
    </div>
  );
}
