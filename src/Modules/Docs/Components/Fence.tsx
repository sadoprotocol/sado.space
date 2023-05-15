/* eslint-disable simple-import-sort/imports */

import Prism from "prismjs";
import { createComponent, createEffect, createSignal } from "solid-js";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";

export function Fence({ children, language }) {
  return children.map((code) => {
    return () =>
      createComponent(CodeHighlighter, {
        language,
        code
      });
  });
}

export function CodeHighlighter(props: CodeHighlighterProps) {
  const [codeRef, setCodeRef] = createSignal<HTMLPreElement | undefined>();

  createEffect(() => {
    if (codeRef()) {
      Prism.highlightElement(codeRef());
    }
  });

  return (
    <pre class={`prism-code language-${props.language}`}>
      <code ref={setCodeRef} class={`language-${props.language}`}>
        {props.code.trim()}
      </code>
    </pre>
  );
}

type CodeHighlighterProps = {
  code: string;
  language: string;
};
