import { IndexedDatabase } from "@valkyr/db";

const db = new IndexedDatabase<{
  docs: Doc;
}>({
  name: "module:docs",
  version: 1,
  registrars: [
    {
      name: "docs",
      indexes: [["path", { unique: true }]]
    }
  ]
});

export const collection = db.collection("docs");

export type Doc = {
  path: string;
  body: string;
};
