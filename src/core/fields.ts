import type { NetworkDefinition } from "../types/index.js";
import { createLuhnCheckDigit } from "./luhn.js";
import { randomInteger, type RandomSource } from "./random.js";

const FIRST_NAMES = [
  "Avery",
  "Jordan",
  "Morgan",
  "Taylor",
  "Casey",
  "Riley",
  "Cameron",
  "Quinn"
] as const;

const LAST_NAMES = [
  "Reed",
  "Morgan",
  "Hayes",
  "Parker",
  "Blake",
  "Cruz",
  "Bennett",
  "Lane"
] as const;

export function generateNumber(
  definition: NetworkDefinition,
  rng: RandomSource
): string {
  let partial = definition.prefix;

  while (partial.length < definition.numberLength - 1) {
    partial += randomInteger(rng, 10);
  }

  return partial + createLuhnCheckDigit(partial);
}

export function generateCvc(length: number, rng: RandomSource): string {
  return Array.from({ length }, () => randomInteger(rng, 10)).join("");
}

export function generateHolder(rng: RandomSource): string {
  const first = FIRST_NAMES[randomInteger(rng, FIRST_NAMES.length)]!;
  const last = LAST_NAMES[randomInteger(rng, LAST_NAMES.length)]!;
  return `${first} ${last}`;
}

export function generateExpiry(rng: RandomSource, now: Date): string {
  const month = String(randomInteger(rng, 12) + 1).padStart(2, "0");
  const year = String((now.getFullYear() + 1 + randomInteger(rng, 5)) % 100).padStart(2, "0");
  return `${month}/${year}`;
}
