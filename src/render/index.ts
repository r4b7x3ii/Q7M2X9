import type { MockCard, RenderOptions } from "../types/index.js";
import { writeTextOutput } from "./files.js";
import { renderCardPng } from "./makeables/index.js";
import { renderCardSvg } from "./svg/index.js";

export { renderCardPng } from "./makeables/index.js";
export { listThemes, renderCardSvg } from "./svg/index.js";

export async function writeCardSvg(
  card: MockCard,
  output: string,
  options: RenderOptions = {}
): Promise<string> {
  return writeTextOutput(output, renderCardSvg(card, options));
}
