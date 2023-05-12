import { Controller, ControllerRoutes, Routed } from "@valkyr/solid";

import { router } from "~Services/Router";

import { config } from "../Config";
import { db } from "../Database";

let resolved = false;

export class DocsController extends Controller<Routed> {
  readonly plugins = [ControllerRoutes.for(router, "docs")];

  async onInit() {
    if (resolved === true) {
      return;
    }

    await this.#eagerLoadPage();
    this.#lazyLoadPages();

    resolved = true;
  }

  async #eagerLoadPage() {
    const link = getCurrentLink();
    if (link === undefined) {
      return;
    }
    await this.#addLink(link);
  }

  async #lazyLoadPages() {
    for (const item of config.navigation) {
      for (const link of item.links) {
        this.#addLink(link);
      }
    }
  }

  async #addLink(link: any) {
    const page = await this.#getRemotePage(link.file);
    const current = await db.collection("docs").findOne({ path: link.href });
    if (current !== undefined) {
      if (current.body !== page) {
        await db.collection("docs").updateOne({ path: link.href }, { $set: { body: page } });
      }
    } else {
      await db.collection("docs").insertOne({
        path: link.href,
        body: page
      });
    }
  }

  async #getRemotePage(url: string) {
    return fetch(url).then((res) => {
      if (res.status === 200) {
        return res.text();
      }
      return "Working on it, check back later ...";
    });
  }
}

function getCurrentLink(): any {
  for (const item of config.navigation) {
    for (const link of item.links) {
      if (link.href === router.location.pathname) {
        return link;
      }
    }
  }
  return undefined;
}
