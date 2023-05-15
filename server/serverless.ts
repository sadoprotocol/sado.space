import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import express from "express";

import { crawlers } from "./Crawlers";
import { renderPage } from "./Render";

const app = express();

const index = readFileSync(resolve(__dirname, "..", "dist", "index.html"), "utf-8");

app.use(async (req, res, next) => {
  const userAgent = (req.query["user-agent"] ?? req.headers["user-agent"]) as string | undefined;
  const isCrawler = userAgent !== undefined && crawlers.some((crawler) => userAgent.includes(crawler)) === true;

  console.log({ isCrawler, userAgent });

  if (isCrawler === true) {
    res.send(await renderPage(req));
  } else {
    next();
  }
});

app.all("*", async (_req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(index);
});

export default app;
