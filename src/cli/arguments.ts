import { CARD_KINDS, NETWORKS } from "../catalog/index.js";
import { listThemes } from "../render/index.js";
import type { CardKind, CardNetwork, CardTheme } from "../types/index.js";

export interface CliOptions {
  network: CardNetwork;
  kind: CardKind;
  holder?: string;
  issuer?: string;
  seed?: string;
  theme: CardTheme;
  output?: string;
  list: boolean;
  help: boolean;
}

function valueAfter(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);

  if (index === -1) return undefined;
  if (!args[index + 1] || args[index + 1]!.startsWith("--")) {
    throw new Error(`Missing value for ${name}`);
  }

  return args[index + 1];
}

function parseChoice<T extends string>(
  value: string | undefined,
  allowed: readonly T[],
  fallback: T,
  label: string
): T {
  if (!value) return fallback;
  if (allowed.includes(value as T)) return value as T;
  throw new Error(`Unknown ${label}: ${value}`);
}

export function parseArguments(args: string[]): CliOptions {
  return {
    network: parseChoice(
      valueAfter(args, "--network"),
      Object.keys(NETWORKS) as CardNetwork[],
      "visa",
      "network"
    ),
    kind: parseChoice(valueAfter(args, "--kind"), CARD_KINDS, "credit", "card kind"),
    holder: valueAfter(args, "--holder"),
    issuer: valueAfter(args, "--issuer"),
    seed: valueAfter(args, "--seed"),
    theme: parseChoice(valueAfter(args, "--theme"), listThemes(), "midnight", "theme"),
    output: valueAfter(args, "--output"),
    list: args.includes("--list"),
    help: args.includes("--help") || args.includes("-h")
  };
}
