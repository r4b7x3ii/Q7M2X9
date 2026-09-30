import assert from "node:assert/strict";
import test from "node:test";
import { NETWORKS } from "../../src/catalog/index.js";
import { generateCard, isLuhnValid } from "../../src/core/index.js";
import type { CardNetwork } from "../../src/types/index.js";

test("generates deterministic data from a seed", () => {
  const first = generateCard({
    network: "visa",
    kind: "virtual",
    seed: "demo",
    now: new Date("2026-09-30T00:00:00Z")
  });

  const second = generateCard({
    network: "visa",
    kind: "virtual",
    seed: "demo",
    now: new Date("2026-09-30T00:00:00Z")
  });

  assert.deepEqual(first, second);
});

test("generates valid numbers for every network", () => {
  for (const network of Object.keys(NETWORKS) as CardNetwork[]) {
    const card = generateCard({
      network,
      seed: network,
      now: new Date("2026-09-30T00:00:00Z")
    });

    assert.equal(isLuhnValid(card.number), true);
    assert.equal(card.number.length, NETWORKS[network].numberLength);
    assert.equal(card.cvc.length, NETWORKS[network].cvcLength);
  }
});
