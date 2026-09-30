import type { MockCard } from "../types/index.js";
import { escapeXml, formatCardNumber } from "./format.js";

export function renderCardDataOverlay(card: MockCard): string {
  const number = escapeXml(formatCardNumber(card));
  const holder = escapeXml(card.holder.toUpperCase());
  const expiry = escapeXml(card.expiry);
  const network = escapeXml(card.networkLabel.toUpperCase());
  const kind = escapeXml(card.kind.toUpperCase());

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="756" viewBox="0 0 1200 756">
  <rect x="64" y="330" width="1072" height="112" rx="24" fill="#000000" opacity="0.38"/>
  <text x="96" y="402" fill="#ffffff" stroke="#000000" stroke-width="1.5" paint-order="stroke" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="54" letter-spacing="4">${number}</text>

  <rect x="64" y="514" width="1072" height="154" rx="24" fill="#000000" opacity="0.38"/>
  <text x="96" y="558" fill="#ffffff" opacity="0.72" font-family="Arial, sans-serif" font-size="18" letter-spacing="2">CARDHOLDER</text>
  <text x="96" y="606" fill="#ffffff" stroke="#000000" stroke-width="1" paint-order="stroke" font-family="Arial, sans-serif" font-size="34" font-weight="700">${holder}</text>

  <text x="690" y="558" fill="#ffffff" opacity="0.72" font-family="Arial, sans-serif" font-size="18" letter-spacing="2">EXPIRES</text>
  <text x="690" y="606" fill="#ffffff" stroke="#000000" stroke-width="1" paint-order="stroke" font-family="Arial, sans-serif" font-size="34" font-weight="700">${expiry}</text>

  <text x="1104" y="558" text-anchor="end" fill="#ffffff" opacity="0.72" font-family="Arial, sans-serif" font-size="17" letter-spacing="1.5">${kind}</text>
  <text x="1104" y="606" text-anchor="end" fill="#ffffff" stroke="#000000" stroke-width="1" paint-order="stroke" font-family="Arial, sans-serif" font-size="28" font-weight="800">${network}</text>

  <rect x="64" y="64" width="154" height="44" rx="22" fill="#000000" opacity="0.48"/>
  <text x="141" y="93" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="1.5">TEST CARD</text>
  <text x="64" y="714" fill="#ffffff" stroke="#000000" stroke-width="1" paint-order="stroke" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="2">NOT FOR PAYMENT</text>
</svg>`;
}
