const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

const app = require("express")();

const index = readFileSync(resolve(__dirname, "..", "dist", "index.html"), "utf-8");

app.use(require('prerender-node').set('prerenderToken', 'xYeGNjAfNaqMmbkcKohK'));

app.use("*", async (_, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(index);
});

module.exports = app;
