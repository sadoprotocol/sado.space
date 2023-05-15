import chromium from "@sparticuz/chromium";
import type { FastifyRequest } from "fastify";
import { JSDOM } from "jsdom";
import puppeteer from "puppeteer-core";

export async function renderPage(req: FastifyRequest) {
  const browser = await puppeteer.launch({
    args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--single-process"],
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ["--disable-extensions"]
  });

  const page = await browser.newPage();

  // Navigate to the page and generate a static HTML version
  await page.goto(`https://sado.space${req.routerPath}`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));

  const content = await page.content();

  // Close the browser instance and send the static HTML to the bot
  await browser.close();

  return removeScriptTags(content);
}

function removeScriptTags(html: string) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const [scripts, links] = getHeadScripts(document);

  // Remove script tags that have a .js file
  scripts.forEach((script) => {
    const src = script.getAttribute("src");
    if (src && src.endsWith(".js")) {
      script.parentNode?.removeChild(script);
    }
  });

  // Remove link tags that have a .js file
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.endsWith(".js")) {
      link.parentNode?.removeChild(link);
    }
  });

  return dom.serialize();
}

function getHeadScripts(document: Document): [HTMLScriptElement[], HTMLLinkElement[]] {
  let scripts: HTMLScriptElement[] = [];
  let links: HTMLLinkElement[] = [];

  const head = document.querySelector("head");
  if (head === null) {
    return [scripts, links];
  }

  const scriptsEls = head.getElementsByTagName("script");
  if (scriptsEls !== null) {
    scripts = Array.from(scriptsEls);
  }

  const linksEls = head.getElementsByTagName("link");
  if (linksEls !== null) {
    links = Array.from(linksEls);
  }

  return [scripts, links];
}
