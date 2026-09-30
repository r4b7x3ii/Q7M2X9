import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import sharp from "sharp";
import type { MockCard, RenderOptions } from "../../types/index.js";
import { assertOutputMissing } from "../files.js";
import { renderCardDataOverlay } from "../overlay.js";
import { runMakeables } from "./cli.js";
import { DEFAULT_CARD_DESIGN } from "./designs.js";

export async function renderCardPng(
  card: MockCard,
  output: string,
  options: RenderOptions = {}
): Promise<string> {
  if (extname(output).toLowerCase() !== ".png") {
    throw new Error("PNG output must use a .png extension");
  }

  const target = await assertOutputMissing(output);
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
      .composite([{ input: Buffer.from(renderCardDataOverlay(card)) }])
      .png()
      .toFile(target);

    return target;
  } finally {
    await rm(workdir, { recursive: true, force: true });
  }
}
