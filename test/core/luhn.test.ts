import assert from "node:assert/strict";
import test from "node:test";
import { createLuhnCheckDigit, isLuhnValid } from "../../src/core/luhn.js";

test("creates a valid Luhn check digit", () => {
  const partial = "424242424242424";
  const number = partial + createLuhnCheckDigit(partial);

  assert.equal(isLuhnValid(number), true);
});

test("rejects non-numeric values", () => {
  assert.equal(isLuhnValid("4242x"), false);
});
