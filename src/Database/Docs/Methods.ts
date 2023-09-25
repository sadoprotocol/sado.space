import { Filter } from "@valkyr/db";

import { collection, Doc } from "./Collection";

export const docs = {
  collection,
  insertOne,
  findOne,
  updateOne
};

async function insertOne(data: Doc) {
  return collection.insertOne(data);
}

async function findOne(filter: Filter<Doc> = {}) {
  return collection.findOne(filter);
}

async function updateOne(filter: Filter<Doc>, update: any) {
  return collection.updateOne(filter, update);
}
