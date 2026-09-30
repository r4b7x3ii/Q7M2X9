import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import sharp from "sharp";
import type { MockCard, RenderOptions } from "../../types/index.js";
import { nextResultOutput } from "../files.js";
import { runMakeables } from "./cli.js";
import { DEFAULT_CARD_DESIGN } from "./designs.js";

const SAFETY_LABEL = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="756" viewBox="0 0 1200 756">
  <rect x="410" y="688" width="380" height="44" rx="22" fill="#000000" opacity="0.56"/>
  <text x="600" y="717" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="3">NOT FOR PAYMENT</text>
</svg>`);

export async function renderCardPng(
  _card: MockCard,
  output: string,
  options: RenderOptions = {}
): Promise<string> {
  if (extname(output).toLowerCase() !== ".png") {
    throw new Error("PNG output must use a .png extension");
  }

  const target = await nextResultOutput(output);
  const workdir = await mkdtemp(join(tmpdir(), "q7m2x9-"));
  const designFile = join(workdir, "card.json");
  const baseImage = join(workdir, "base.png");
  const design = options.design ?? DEFAULT_CARD_DESIGN;

  try {
    await runMakeables(
      ["new", "card", "--design", design, "--out", designFile],
      workdir
    );
    await runMakeables(
      ["render", "--file", designFile, "--out", baseImage],
      workdir
    );

    await sharp(baseImage)
      .resize(1200, 756, { fit: "fill" })
      .composite([{ input: SAFETY_LABEL }])
      .png()
      .toFile(target);

    return target;
  } finally {
    await rm(workdir, { recursive: true, force: true });
  }
}
