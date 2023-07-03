import { Link } from "~Atoms/Link/Link.Component";

import { Callout } from "./Callout";
import { Data, DataItem, DataModel, DataValue } from "./Data";
import { Endpoint } from "./Endpoint";
import { Fence } from "./Fence";
import { Preview, PreviewSection } from "./Preview";
import { PreviewModel, PreviewObject, PreviewObjectItem, PreviewObjectValue } from "./PreviewObject";
import { QuickLink, QuickLinks } from "./QuickLinks";

export const components = {
  Callout,
  Data,
  DataItem,
  DataModel,
  DataValue,
  Endpoint,
  Fence,
  Preview,
  PreviewSection,
  PreviewModel,
  PreviewObject,
  PreviewObjectItem,
  PreviewObjectValue,
  Link,
  QuickLinks,
  QuickLink
};

export type Components = typeof components;
