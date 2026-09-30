#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { CARD_KINDS, NETWORKS } from "../catalog/index.js";
import { generateCard } from "../core/index.js";
import { listThemes, renderCardPng, writeCardSvg } from "../render/index.js";
import { parseArguments } from "./arguments.js";
import { HELP } from "./help.js";

const options = parseArguments(process.argv.slice(2));

if (options.help) {
  console.log(HELP);
  process.exit(0);
}

if (options.list) {
  console.log(
    JSON.stringify(
      {
        networks: Object.keys(NETWORKS),
        kinds: CARD_KINDS,
        themes: listThemes()
      },
      null,
      2
    )
  );
  process.exit(0);
}

const card = generateCard({
  network: options.network,
  kind: options.kind,
  holder: options.holder,
  issuer: options.issuer,
  seed: options.seed
});

if (!options.output) {
  console.log(JSON.stringify(card, null, 2));
  process.exit(0);
}

const target = resolve(options.output);
const extension = extname(target).toLowerCase();

if (extension === ".svg") {
  await writeCardSvg(card, target, { theme: options.theme });
} else if (extension === ".png") {
  await renderCardPng(card, target, { theme: options.theme });
} else if (extension === ".json") {
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `${JSON.stringify(card, null, 2)}\n`, { flag: "wx" });
} else {
  throw new Error("Output must be .json, .svg, or .png");
}

console.log(target);
