import Markdoc, { Node, Tag } from "@markdoc/markdoc";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import type { Location } from "@valkyr/router";
import { Controller } from "@valkyr/solid";
import yaml from "js-yaml";

import { router } from "~Services/Router";

import { Callout } from "../Components/Callout";
import { Fence } from "../Components/Fence";
import { QuickLink, QuickLinks } from "../Components/QuickLinks";
import { config } from "../Config";
import { db } from "../Database";
import { nodes } from "../Library/Nodes";
import { tags } from "../Library/Tags";
import render from "../Render";

export class ContentController extends Controller<{
  title: any;
  pageTitle: any;
  description: any;
  previousPage: any;
  nextPage: any;
  section: any;
  tableOfContents: any[];
  content: any;
}> {
  async onInit() {
    await this.#loadContent();
    this.setSubscriptions({
      hash: router.subscribeToLocation(this.#handleLocationChange)
    });
  }

  async #loadContent() {
    const doc = await db.collection("docs").findOne({ path: router.location.pathname });
    if (doc !== undefined) {
      window.scrollTo(0, 0);
      this.#parse(doc.body);
    }
  }

  #handleLocationChange = async (location: Location) => {
    const el = document.getElementById(location.hash.replace("#", ""));
    const style = window.getComputedStyle(el);
    const scrollMt = parseFloat(style.scrollMarginTop);
    const top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
    window.scrollTo(0, top);
  };

  #parse(doc: string): void {
    const ast = Markdoc.parse(doc);
    const content = Markdoc.transform(ast, { tags, nodes });
    const frontmatter = getFrontmatter(ast);

    const [previousPage, nextPage] = this.#getPageLinks();

    this.setState({
      title: frontmatter.title,
      pageTitle: frontmatter.pageTitle || `${frontmatter.title} - Docs`,
      description: frontmatter.description,
      previousPage,
      nextPage,
      section: config.navigation.find((section) =>
        section.links.find((link) => link.href === router.location.pathname)
      ),
      tableOfContents: collectHeadings((content as Tag).children),
      content: render(content, {
        components: {
          Callout,
          QuickLinks,
          QuickLink,
          Fence
        }
      })
    });
  }

  #getPageLinks() {
    const allLinks = config.navigation.flatMap((section) => section.links);
    const linkIndex = allLinks.findIndex((link) => link.href === router.location.pathname);
    return [allLinks[linkIndex - 1], allLinks[linkIndex + 1]];
  }
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
