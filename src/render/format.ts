import { NETWORKS } from "../catalog/index.js";
import type { MockCard } from "../types/index.js";

export function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function formatCardNumber(card: MockCard): string {
  const groups = NETWORKS[card.network].groups;
  const parts: string[] = [];
  let offset = 0;

  for (const size of groups) {
    parts.push(card.number.slice(offset, offset + size));
    offset += size;
  }

  return parts.join(" ");
}
