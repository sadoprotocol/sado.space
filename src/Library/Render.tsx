import type { RenderableTreeNodes, Tag } from "@markdoc/markdoc";
import { For } from "solid-js";
import { Dynamic } from "solid-js/web";

import { components } from "./Components";

export function render(node: RenderableTreeNodes) {
  if (isTag(node)) {
    return renderTag(node);
  }
  if (typeof node === "string") {
    return node;
  }
  return <div>Unknown Node</div>;
}

function renderTag(tag: Tag) {
  if (components[tag.name] !== undefined) {
    return (
      <Dynamic component={components[tag.name]} {...tag.attributes}>
        <For each={tag.children} children={render} />
      </Dynamic>
    );
  }
  return (
    <Dynamic component={tag.name} {...tag.attributes}>
      <For each={tag.children} children={render} />
    </Dynamic>
  );
}

function isTag(node: any): node is Tag {
  if (typeof node === "string") {
    return false;
  }
  return node.$$mdtype === "Tag";
}
