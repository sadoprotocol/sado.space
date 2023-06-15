import { Controller } from "@valkyr/solid";

import { router } from "~Services/Router";

import { db } from "../Database";
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
      hash: router.subscribeToLocation((location) => markdoc.scrollTo(location.hash))
    });
  }

  async #loadContent() {
    const doc = await db.collection("docs").findOne({ path: router.location.pathname });
    if (doc !== undefined) {
      window.scrollTo(0, 0);
      this.setState(markdoc.getParsedDocument(doc.body));
    }
  }
}
