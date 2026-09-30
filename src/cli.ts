#!/usr/bin/env node

import { writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import {
  CARD_KINDS,
  NETWORKS,
  generateCard,
  listThemes,
  renderCardPng,
  writeCardSvg
} from "./index.js";
import type { CardKind, CardNetwork, CardTheme } from "./types.js";

function option(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

function help(): void {
  console.log(`Q7M2X9

Usage:
  q7m2x9 [options]

Options:
  --network <name>   Card network
  --kind <name>      credit, debit, prepaid, virtual, business, or gift
  --holder <name>    Cardholder name
  --issuer <name>    Issuer label
  --seed <value>     Reproducible output
  --theme <name>     midnight, slate, aurora, or ember
  --output <file>    .json, .svg, or .png
  --list             Show available networks, kinds, and themes
  --help             Show this help
`);
}

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  help();
  process.exit(0);
}

if (args.includes("--list")) {
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
  network: (option(args, "--network") ?? "visa") as CardNetwork,
  kind: (option(args, "--kind") ?? "credit") as CardKind,
  holder: option(args, "--holder"),
  issuer: option(args, "--issuer"),
  seed: option(args, "--seed")
});

const output = option(args, "--output");
const theme = (option(args, "--theme") ?? "midnight") as CardTheme;

if (!output) {
  console.log(JSON.stringify(card, null, 2));
  process.exit(0);
}

const target = resolve(output);
const extension = extname(target).toLowerCase();

if (extension === ".svg") {
  await writeCardSvg(card, target, { theme });
} else if (extension === ".png") {
  await renderCardPng(card, target, { theme });
} else if (extension === ".json") {
  await writeFile(target, `${JSON.stringify(card, null, 2)}\n`, { flag: "wx" });
} else {
  throw new Error("Output must be .json, .svg, or .png");
}

console.log(target);
