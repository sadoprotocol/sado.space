import { Icon } from "solid-heroicons";
import { chevronDown } from "solid-heroicons/solid";
import { createSignal, Show } from "solid-js";

import { PreviewObjectItem } from "./PreviewObject";

export function JsonRpcResponse({ children }) {
  const [show, setShow] = createSignal(false);
  return (
    <div class="divide-y divide-slate-200 border-t border-slate-200 dark:divide-slate-700 dark:border-slate-700">
      <button
        class="flex w-full items-center justify-between px-4 py-2 text-left font-medium text-slate-500 first:rounded-t-lg last:rounded-b-lg dark:text-slate-400"
        onClick={() => setShow(!show())}
      >
        <span>
          Response <i class="text-xs">JSON-RPC 2.0</i>
        </span>
        <Icon
          path={chevronDown}
          classList={{
            ["h-6 w-6 shrink-0"]: true,
            ["rotate-180"]: show()
          }}
        />
      </button>
      <Show when={show()}>
        <div class="bg-slate-800/[0.7] p-5">
          <PreviewObjectItem
            name="jsonrpc"
            type="string"
            description="JSON-RPC protocol version."
            children={() => []}
          />
          {children}
          <PreviewObjectItem name="id" type="string | number | null" description="Request id." children={() => []} />
        </div>
      </Show>
    </div>
  );
}
