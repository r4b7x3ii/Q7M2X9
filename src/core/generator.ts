import { randomUUID } from "node:crypto";
import { CARD_KINDS, NETWORKS } from "../catalog/index.js";
import type {
  CardKind,
  CardNetwork,
  GenerateCardOptions,
  MockCard
} from "../types/index.js";
import { generateCvc, generateExpiry, generateHolder, generateNumber } from "./fields.js";
import { createRandomSource } from "./random.js";

function isCardNetwork(value: string): value is CardNetwork {
  return value in NETWORKS;
}

function isCardKind(value: string): value is CardKind {
  return CARD_KINDS.includes(value as CardKind);
}

export function generateCard(options: GenerateCardOptions = {}): MockCard {
  const network = options.network ?? "visa";
  const kind = options.kind ?? "credit";

  if (!isCardNetwork(network)) {
    throw new RangeError(`Unknown card network: ${network}`);
  }

  if (!isCardKind(kind)) {
    throw new RangeError(`Unknown card kind: ${kind}`);
  }

  const definition = NETWORKS[network];
  const seed = String(options.seed ?? randomUUID());
  const rng = createRandomSource(seed);

  return {
    number: generateNumber(definition, rng),
    holder: options.holder ?? generateHolder(rng),
    expiry: generateExpiry(rng, options.now ?? new Date()),
    cvc: generateCvc(definition.cvcLength, rng),
    network,
    networkLabel: definition.label,
    kind,
    issuer: options.issuer ?? "Mock Issuer",
    seed,
    testOnly: true
  };
}
