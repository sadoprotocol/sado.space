import { Controller } from "@valkyr/solid";

import { db } from "~Services/Database";
import { router } from "~Services/Router";

import { markdoc } from "../Library";

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
    this.setSubscription({
      hash: router.subscribeToHash((hash) => markdoc.scrollTo(hash))
    });
    setTimeout(() => {
      if (router.history.location.hash) {
        markdoc.scrollTo(router.history.location.hash);
      }
    }, 250);
  }

  async #loadContent() {
    const doc = await db.collection("docs").findOne({ path: router.history.location.pathname });
    if (doc !== undefined) {
      window.scrollTo(0, 0);
      this.setState(markdoc.getParsedDocument(doc.body));
    }
  }
}
