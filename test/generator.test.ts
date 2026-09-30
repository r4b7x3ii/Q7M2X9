import assert from "node:assert/strict";
import test from "node:test";
import { NETWORKS, generateCard, isLuhnValid, renderCardSvg } from "../src/index.js";
import type { CardNetwork } from "../src/types.js";

test("generates deterministic card data from a seed", () => {
  const first = generateCard({ network: "visa", kind: "virtual", seed: "demo" });
  const second = generateCard({ network: "visa", kind: "virtual", seed: "demo" });
  assert.deepEqual(first, second);
});

test("generated numbers pass Luhn validation", () => {
  for (const network of Object.keys(NETWORKS) as CardNetwork[]) {
    const card = generateCard({ network, seed: network });
    assert.equal(isLuhnValid(card.number), true);
    assert.equal(card.number.length, NETWORKS[network].length);
    assert.equal(card.cvc.length, NETWORKS[network].cvcLength);
  }
});

test("renders a visibly test-only SVG", () => {
  const card = generateCard({ seed: "svg-test", holder: "A & B" });
  const svg = renderCardSvg(card);
  assert.match(svg, /TEST CARD/);
  assert.match(svg, /NOT FOR PAYMENT/);
  assert.match(svg, /A &amp; B/);
});
