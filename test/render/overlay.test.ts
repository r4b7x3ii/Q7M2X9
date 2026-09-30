import assert from "node:assert/strict";
import test from "node:test";
import { generateCard } from "../../src/core/index.js";
import { renderCardDataOverlay } from "../../src/render/overlay.js";

test("renders generated card data as a test overlay", () => {
  const card = generateCard({
    network: "amex",
    kind: "credit",
    holder: "A & B",
    seed: "overlay",
    now: new Date("2026-09-30T00:00:00Z")
  });

  const svg = renderCardDataOverlay(card);

  assert.match(svg, /TEST CARD/);
  assert.match(svg, /NOT FOR PAYMENT/);
  assert.match(svg, /A &amp; B/);
  assert.match(svg, /\d{4} \d{6} \d{5}/);
  assert.match(svg, /AMERICAN EXPRESS/);
});
