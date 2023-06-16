/* eslint-disable simple-import-sort/imports */

import Prism from "prismjs";
import { For, createEffect, createSignal, children as useChildren } from "solid-js";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/plugins/line-numbers/prism-line-numbers";

export function Fence({ language, preview = false, children }) {
  return (
    <For each={useChildren(() => children).toArray()}>
      {(code: string) => <CodeHighlighter language={language} preview={preview} code={code} />}
    </For>
  );
}

export function CodeHighlighter(props: CodeHighlighterProps) {
  const [codeRef, setCodeRef] = createSignal<HTMLPreElement | undefined>();

  createEffect(() => {
    if (codeRef()) {
      Prism.highlightElement(codeRef());
    }
  });

  return (
    <pre class={`prism-code line-numbers language-${props.language}${props.preview === true ? " preview" : ""}`}>
      <code ref={setCodeRef} class={`language-${props.language}`}>
        {props.code.trim()}
      </code>
    </pre>
  );
}

type CodeHighlighterProps = {
  language: string;
  code: string;
  preview: boolean;
};
