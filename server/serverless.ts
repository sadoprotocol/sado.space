import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import fastify, { FastifyRequest } from "fastify";

import { crawlers } from "./Crawlers";
import { renderPage } from "./Render";

const app = fastify();

const index = readFileSync(resolve(__dirname, "..", "dist", "index.html"), "utf-8");

app.register(
  async function (instance, _opts, done) {
    instance.all("*", async (request: Request, reply) => {
      reply.headers({
        "Content-Type": "text/html",
        "Cache-Control": "s-max-age=1, stale-while-revalidate"
      });

      const userAgent = request.query["user-agent"] ?? request.headers["user-agent"];
      const isCrawler = userAgent !== undefined && crawlers.some((crawler) => userAgent.includes(crawler)) === true;

      reply.status(200).send(isCrawler === true ? await renderPage(request) : index);
    });
    done();
  },
  {
    prefix: "/"
  }
);

type Request = FastifyRequest<{
  Querystring: {
    "user-agent"?: string;
  };
}>;

export default async (req: any, res: any) => {
  await app.ready();
  app.server.emit("request", req, res);
};
