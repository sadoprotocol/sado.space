import { CodeHighlighter } from "../Library/Components/Fence";

export function CodeBlock({ tabs, code, language }: Props) {
  return (
    <div class="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur">
      <div class="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" />
      <div class="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />
      <div class="pl-4 pt-4">
        <TrafficLightsIcon class="h-2.5 w-auto stroke-slate-500/30" />
        <div class="mt-4 flex space-x-2 text-xs">
          {tabs.map((tab) => (
            <div
              classList={{
                "flex h-6 rounded-full": true,
                "bg-gradient-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px font-medium text-sky-300":
                  tab.isActive,
                "text-slate-500": !tab.isActive
              }}
            >
              <div
                classList={{
                  "flex items-center rounded-full px-2.5": true,
                  "bg-slate-800": tab.isActive
                }}
              >
                {tab.name}
              </div>
            </div>
          ))}
        </div>
        <div class="flex items-start px-1 text-sm">
          <div aria-hidden="true" class="select-none pr-1 font-mono text-slate-600" style="padding-top:1.3rem">
            {Array.from({
              length: code.split("\n").length
            }).map((_, index) => (
              <div style="line-height:1.51">{(index + 1).toString().padStart(2, "0")}</div>
            ))}
          </div>
          <CodeHighlighter code={code} language={language} />
        </div>
      </div>
    </div>
  );
}

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  );
}

type Props = {
  tabs: Tab[];
  code: string;
  language: string;
};

type Tab = {
  name: string;
  isActive: boolean;
};
