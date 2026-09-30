import { extname } from "node:path";
import puppeteer from "puppeteer";
import type { MockCard } from "../../types/index.js";
import { nextResultOutput } from "../files.js";
import { renderCardDocument } from "./document.js";

export async function renderCardPng(
  card: MockCard,
  output: string
): Promise<string> {
  if (extname(output).toLowerCase() !== ".png") {
    throw new Error("PNG output must use a .png extension");
  }

  const target = await nextResultOutput(output);
  const html = await renderCardDocument(card);

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
  } catch (error) {
    throw new Error(
      "Unable to start Chrome for card rendering. Run npm install or npx puppeteer browsers install chrome.",
      { cause: error }
    );
  }

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 756, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: "load" });

    const stage = await page.$(".q7m2x9-stage");
    if (!stage) {
      throw new Error("Card preview did not render");
    }

    await stage.screenshot({
      path: target,
      omitBackground: true
    });

    return target;
  } finally {
    await browser.close();
  }
}
