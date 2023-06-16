import { Link } from "~Atoms/Link/Link.Component";

import { Callout } from "./Callout";
import { Fence } from "./Fence";
import { Preview, PreviewParameter, PreviewParameters, PreviewSection, PreviewValue } from "./Preview";
import { QuickLink, QuickLinks } from "./QuickLinks";

export const components = {
  Callout,
  Fence,
  Preview,
  PreviewSection,
  PreviewParameters,
  PreviewParameter,
  PreviewValue,
  Link,
  QuickLinks,
  QuickLink
};

export type Components = typeof components;
