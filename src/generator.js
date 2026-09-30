import { randomUUID } from "node:crypto";
import { CARD_KINDS, NETWORKS } from "./catalog.js";

const FIRST_NAMES = ["Avery", "Jordan", "Morgan", "Taylor", "Casey", "Riley", "Cameron", "Quinn"];
const LAST_NAMES = ["Reed", "Morgan", "Hayes", "Parker", "Blake", "Cruz", "Bennett", "Lane"];

function hashSeed(value) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRng(seed) {
  let state = hashSeed(seed);
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function randomDigit(rng) {
  return Math.floor(rng() * 10);
}

function luhnCheckDigit(partial) {
  const totalLength = partial.length + 1;
  let sum = 0;

  for (let index = 0; index < partial.length; index += 1) {
    let digit = Number(partial[index]);
    if (index % 2 === totalLength % 2) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  return String((10 - (sum % 10)) % 10);
}

function generateNumber(definition, rng) {
  let partial = definition.prefix;
  while (partial.length < definition.length - 1) {
    partial += randomDigit(rng);
  }
  return partial + luhnCheckDigit(partial);
}

function generateCvc(length, rng) {
  return Array.from({ length }, () => randomDigit(rng)).join("");
}

function generateHolder(rng) {
  const first = FIRST_NAMES[Math.floor(rng() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(rng() * LAST_NAMES.length)];
  return `${first} ${last}`;
}

function generateExpiry(rng, now = new Date()) {
  const month = String(Math.floor(rng() * 12) + 1).padStart(2, "0");
  const year = String((now.getFullYear() + 1 + Math.floor(rng() * 5)) % 100).padStart(2, "0");
  return `${month}/${year}`;
}

export function isLuhnValid(number) {
  let sum = 0;
  let double = false;

  for (let index = number.length - 1; index >= 0; index -= 1) {
    let digit = Number(number[index]);
    if (!Number.isInteger(digit)) return false;
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }

  return sum % 10 === 0;
}

export function generateCard(options = {}) {
  const network = options.network ?? "visa";
  const kind = options.kind ?? "credit";
  const definition = NETWORKS[network];

  if (!definition) {
    throw new Error(`Unknown network: ${network}`);
  }
  if (!CARD_KINDS.includes(kind)) {
    throw new Error(`Unknown card kind: ${kind}`);
  }

  const seed = String(options.seed ?? randomUUID());
  const rng = createRng(seed);

  return {
    number: generateNumber(definition, rng),
    holder: options.holder ?? generateHolder(rng),
    expiry: generateExpiry(rng),
    cvc: generateCvc(definition.cvcLength, rng),
    network,
    networkLabel: definition.label,
    kind,
    issuer: options.issuer ?? "Mock Issuer",
    seed,
    testOnly: true
  };
}
