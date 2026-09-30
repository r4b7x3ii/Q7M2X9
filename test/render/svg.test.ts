import assert from "node:assert/strict";
import test from "node:test";
import { generateCard } from "../../src/core/index.js";
import { renderCardSvg } from "../../src/render/svg/index.js";

test("renders test markings and escapes content", () => {
  const card = generateCard({
    seed: "svg",
    holder: "A & B",
    now: new Date("2026-09-30T00:00:00Z")
  });

  const svg = renderCardSvg(card);

  assert.match(svg, /viewBox="0 0 1200 756"/);\n  assert.match(svg, /TEST CARD/);
  assert.match(svg, /NOT FOR PAYMENT/);
  assert.match(svg, /A &amp; B/);
});

test("uses network-specific number grouping", () => {
  const card = generateCard({
    network: "amex",
    seed: "amex",
    now: new Date("2026-09-30T00:00:00Z")
  });

  const svg = renderCardSvg(card);
  assert.match(svg, /\d{4} \d{6} \d{5}/);
});
