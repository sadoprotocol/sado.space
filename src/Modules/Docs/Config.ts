import { Component } from "solid-js";

export const config: {
  name: string;
  logo?: [Component, Record<string, any>];
  landing: string;
  hero: HeroConfig;
  navigation: Navigation[];
} = {
  name: "Sado",
  landing: "/",
  hero: {
    title: "Sado",
    marqee: ["Self-Authenticating", "Decentralized", "Ordinalbooks"],
    description: "Navigate the world of Ordinals with Sado space.",
    code: {
      language: "typescript",
      text: "const hello = 'world';",
      tabs: [{ name: "hello.ts", isActive: true }]
    }
  },
  navigation: []
};

export type HeroConfig = {
  title: string;
  marqee: string[];
  description: string;
  code: {
    language: string;
    text: string;
    tabs: {
      name: string;
      isActive: boolean;
    }[];
  };
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
