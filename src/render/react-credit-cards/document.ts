import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { MockCard } from "../../types/index.js";

interface CardComponentProps {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  focused: "";
}

const require = createRequire(import.meta.url);
const loaded = require("react-credit-cards-2") as
  | React.ComponentType<CardComponentProps>
  | { default: React.ComponentType<CardComponentProps> };
const Cards = typeof loaded === "function" ? loaded : loaded.default;
const stylesPath = require.resolve(
  "react-credit-cards-2/dist/es/styles-compiled.css"
);
const scale = 1200 / 290;

export async function renderCardDocument(card: MockCard): Promise<string> {
  const styles = await readFile(stylesPath, "utf8");
  const cardMarkup = renderToStaticMarkup(
    React.createElement(Cards, {
      number: card.number,
      name: card.holder,
      expiry: card.expiry,
      cvc: card.cvc,
      focused: ""
    })
  );

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
${styles}
html, body {
  margin: 0;
  width: 1200px;
  height: 756px;
  overflow: hidden;
  background: transparent;
}
* {
  box-sizing: border-box;
  animation: none !important;
  transition: none !important;
}
.q7m2x9-stage {
  position: relative;
  width: 1200px;
  height: 756px;
  overflow: hidden;
}
.q7m2x9-card {
  width: 290px;
  height: 183px;
  transform: scale(${scale});
  transform-origin: top left;
}
.rccs {
  margin: 0;
}
.q7m2x9-watermark {
  position: absolute;
  left: 50%;
  bottom: 16px;
  z-index: 100;
  transform: translateX(-50%);
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.58);
  color: #fff;
  font: 700 18px/1 Arial, sans-serif;
  letter-spacing: 3px;
  white-space: nowrap;
}
</style>
</head>
<body>
  <div class="q7m2x9-stage">
    <div class="q7m2x9-card">${cardMarkup}</div>
    <div class="q7m2x9-watermark">NOT FOR PAYMENT</div>
  </div>
</body>
</html>`;
}
