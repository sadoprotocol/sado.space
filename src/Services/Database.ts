import { Document, IndexedDatabase } from "@valkyr/db";

export const db = new IndexedDatabase<{
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

export type Doc = Document<{
  path: string;
  body: string;
}>;
