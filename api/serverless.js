const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

const { crawlers } = require("./Crawlers");
const { renderPage } = require("./Render");

const app = require("express")();

const index = readFileSync(resolve(__dirname, "..", "dist", "index.html"), "utf-8");

app.use("*", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  const userAgent = req.query["user-agent"] ?? req.headers["user-agent"];
  const isCrawler = userAgent !== undefined && crawlers.some((crawler) => userAgent.includes(crawler)) === true;

  res.end(isCrawler === true ? await renderPage(req) : index);
});

module.exports = app;
