import assert from "node:assert/strict";
import test from "node:test";
import { renderCardDocument } from "../../src/render/react-credit-cards/index.js";
import type { MockCard } from "../../src/types/index.js";

test("renders generated card fields with the safety label", async () => {
  const card: MockCard = {
    number: "4242424242424242",
    holder: "TEST USER",
    expiry: "12/28",
    cvc: "123",
    network: "visa",
    networkLabel: "Visa",
    kind: "credit",
    issuer: "Mock Issuer",
    seed: "document",
    testOnly: true
  };

  const html = await renderCardDocument(card);

  assert.match(html, /4242 4242 4242 4242/);
  assert.match(html, /TEST USER/);
  assert.match(html, /12\/28/);
  assert.match(html, /rccs__card--visa/);
  assert.match(html, /NOT FOR PAYMENT/);
});
