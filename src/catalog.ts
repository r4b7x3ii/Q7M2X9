import type { CardKind, CardNetwork, NetworkDefinition } from "./types.js";

export const NETWORKS: Readonly<Record<CardNetwork, NetworkDefinition>> = Object.freeze({
  visa: { label: "Visa", prefix: "424242", length: 16, cvcLength: 3 },
  mastercard: { label: "Mastercard", prefix: "555555", length: 16, cvcLength: 3 },
  amex: { label: "American Express", prefix: "378282", length: 15, cvcLength: 4 },
  discover: { label: "Discover", prefix: "601111", length: 16, cvcLength: 3 },
  jcb: { label: "JCB", prefix: "353011", length: 16, cvcLength: 3 },
  diners: { label: "Diners Club", prefix: "305693", length: 14, cvcLength: 3 },
  unionpay: { label: "UnionPay", prefix: "620000", length: 16, cvcLength: 3 },
  maestro: { label: "Maestro", prefix: "675964", length: 16, cvcLength: 3 }
});

export const CARD_KINDS: readonly CardKind[] = Object.freeze([
  "credit",
  "debit",
  "prepaid",
  "virtual",
  "business",
  "gift"
]);
