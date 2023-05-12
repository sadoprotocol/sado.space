import { config } from "./Config";

export function getTitleByHref(href: string, fallback = ""): string {
  for (const nav of config.navigation) {
    for (const link of nav.links) {
      if (link.href === href) {
        return `${nav.title} - ${link.title}`;
      }
    }
  }
  return fallback;
}
