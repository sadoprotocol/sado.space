import { Component } from "solid-js";

export const config: {
  name: string;
  logo?: [Component, Record<string, any>];
  landing: string;
  hero: HeroConfig;
  navigation: Navigation[];
} = {
  name: "SADO",
  landing: "/",
  hero: {
    title: "SADO",
    marqee: ["Self-Authenticating", "Decentralized", "Orderbooks"],
    description: "Navigate the world of Ordinals with SADO space."
  },
  navigation: []
};

export type HeroConfig = {
  title: string;
  marqee: string[];
  description: string;
};

export type Navigation = {
  /**
   * Title of the documentation section. Used by the docs to populate category
   * title text.
   */
  title: string;

  /**
   * List of links mapped under the navigation category.
   */
  links: NavigationLink[];
};

export type NavigationLink = {
  /**
   * Title of the documentation page, used by the docs to populate titles and
   * can also be used by the router to set the document title.
   */
  title: string;

  /**
   * Router path to the documentation page. Should be a path mapping to the
   * registered router endpoints.
   */
  href: string;

  /**
   * Path to the markdown file. This can be a relative path from the website
   * public root or a full URL.
   */
  file: string;
};
