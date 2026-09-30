import type { CardNetwork, NetworkDefinition } from "../types/index.js";

export const NETWORKS: Readonly<Record<CardNetwork, NetworkDefinition>> = Object.freeze({
  visa: {
    label: "Visa",
    prefix: "424242",
    numberLength: 16,
    cvcLength: 3,
    groups: [4, 4, 4, 4]
  },
  mastercard: {
    label: "Mastercard",
    prefix: "555555",
    numberLength: 16,
    cvcLength: 3,
    groups: [4, 4, 4, 4]
  },
  amex: {
    label: "American Express",
    prefix: "378282",
    numberLength: 15,
    cvcLength: 4,
    groups: [4, 6, 5]
  },
  discover: {
    label: "Discover",
    prefix: "601111",
    numberLength: 16,
    cvcLength: 3,
    groups: [4, 4, 4, 4]
  },
  jcb: {
    label: "JCB",
    prefix: "353011",
    numberLength: 16,
    cvcLength: 3,
    groups: [4, 4, 4, 4]
  },
  diners: {
    label: "Diners Club",
    prefix: "305693",
    numberLength: 14,
    cvcLength: 3,
    groups: [4, 6, 4]
  },
  unionpay: {
    label: "UnionPay",
    prefix: "620000",
    numberLength: 16,
    cvcLength: 3,
    groups: [4, 4, 4, 4]
  },
  maestro: {
    label: "Maestro",
    prefix: "675964",
    numberLength: 16,
    cvcLength: 3,
    groups: [4, 4, 4, 4]
  }
});
