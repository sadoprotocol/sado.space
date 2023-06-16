import Markdoc, { Node, Tag } from "@markdoc/markdoc";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import yaml from "js-yaml";
import { JSXElement } from "solid-js";

import { router } from "~Services/Router";

import { config, Navigation, NavigationLink } from "../Config";
import { nodes } from "./Nodes";
import { render } from "./Render";
import { tags } from "./Tags";

export const markdoc = {
  getParsedDocument,
  scrollTo
};

/*
 |--------------------------------------------------------------------------------
 | Methods
 |--------------------------------------------------------------------------------
 */

/**
 * Takes a markdown document and returns MarkdownDocument result which consists
 * of all the required details to render the document.
 *
 * @param doc - The markdown document to parse.
 *
 * @returns The parsed document.
 */
function getParsedDocument(doc: string): MarkdownDocument {
  const tokenizer = new Markdoc.Tokenizer({ allowIndentation: true });
  const tokens = tokenizer.tokenize(doc);
  const ast = Markdoc.parse(tokens);
  const content = Markdoc.transform(ast, { tags, nodes });
  const frontmatter = getFrontmatter(ast);
  const [previousPage, nextPage] = getPageLinks();
  return {
    title: frontmatter.title,
    pageTitle: frontmatter.pageTitle || `${frontmatter.title} - Docs`,
    description: frontmatter.description,
    previousPage,
    nextPage,
    section: config.navigation.find((section) => section.links.find((link) => link.href === router.location.pathname)),
    tableOfContents: collectHeadings((content as Tag).children),
    content: () => render(content)
  };
}

/**
 * Scroll to the given hash marker from the top of the page.
 *
 * @param hash - The hash marker to scroll to.
 */
function scrollTo(hash: string) {
  const el = document.getElementById(hash.replace("#", ""));
  const style = window.getComputedStyle(el);
  const scrollMt = parseFloat(style.scrollMarginTop);
  const top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
  window.scrollTo(0, top);
}

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

function getPageLinks() {
  const allLinks = config.navigation.flatMap((section) => section.links);
  const linkIndex = allLinks.findIndex((link) => link.href === router.location.pathname);
  return [allLinks[linkIndex - 1], allLinks[linkIndex + 1]];
}

function getFrontmatter(ast: Node) {
  if (ast.attributes.frontmatter) {
    return yaml.load(ast.attributes.frontmatter);
  }
  return {};
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  const sections = [];

  for (const node of nodes) {
    if (node.name === "h2" || node.name === "h3") {
      const title = getNodeText(node);
      if (title) {
        const id = slugify(title);
        node.attributes.id = id;
        if (node.name === "h3") {
          if (!sections[sections.length - 1]) {
            throw new Error("Cannot add `h3` to table of contents without a preceding `h2`");
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title
          });
        } else {
          sections.push({ ...node.attributes, title, children: [] });
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify));
  }

  return sections;
}

function getNodeText(node) {
  let text = "";
  for (const child of node.children ?? []) {
    if (typeof child === "string") {
      text += child;
    }
    text += getNodeText(child);
  }
  return text;
}

/*
 |--------------------------------------------------------------------------------
 | Types
 |--------------------------------------------------------------------------------
 */

type MarkdownDocument = {
  title: string;
  pageTitle: string;
  description: string;
  previousPage?: NavigationLink;
  nextPage?: NavigationLink;
  section: Navigation;
  tableOfContents: any[];
  content: () => JSXElement;
};
