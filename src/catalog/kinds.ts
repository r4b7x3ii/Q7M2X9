import type { CardKind } from "../types/index.js";

export const CARD_KINDS: readonly CardKind[] = Object.freeze([
  "credit",
  "debit",
  "prepaid",
  "virtual",
  "business",
  "gift"
]);
