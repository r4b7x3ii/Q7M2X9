import type { MockCard, RenderOptions } from "../../types/index.js";
import { escapeXml, formatCardNumber } from "./format.js";
import { THEMES } from "./themes.js";

export function renderCardSvg(
  card: MockCard,
  options: RenderOptions = {}
): string {
  const theme = THEMES[options.theme ?? "midnight"];
  const holder = escapeXml(card.holder.toUpperCase());
  const issuer = escapeXml(card.issuer);
  const number = escapeXml(formatCardNumber(card));
  const network = escapeXml(card.networkLabel.toUpperCase());
  const kind = escapeXml(card.kind.toUpperCase());
  const expiry = escapeXml(card.expiry);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="856" height="540" viewBox="0 0 856 540">
  <defs>
    <linearGradient id="card-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${theme.from}"/>
      <stop offset="1" stop-color="${theme.to}"/>
    </linearGradient>
  </defs>
  <rect width="856" height="540" rx="42" fill="url(#card-bg)"/>
  <circle cx="740" cy="90" r="180" fill="#ffffff" opacity="0.05"/>
  <circle cx="90" cy="500" r="150" fill="#ffffff" opacity="0.04"/>
  <text x="58" y="76" fill="${theme.text}" font-family="Arial, sans-serif" font-size="30" font-weight="700">${issuer}</text>
  <text x="798" y="76" text-anchor="end" fill="${theme.muted}" font-family="Arial, sans-serif" font-size="18" font-weight="700">TEST CARD</text>
  <rect x="60" y="150" width="94" height="70" rx="14" fill="#d6b96a"/>
  <path d="M107 150v70M60 185h94M83 150v70M131 150v70" stroke="#8f762c" stroke-width="3" opacity="0.8"/>
  <path d="M184 163c22 12 22 32 0 44M197 153c34 18 34 46 0 64M210 143c46 24 46 60 0 84" fill="none" stroke="${theme.muted}" stroke-width="5" stroke-linecap="round"/>
  <text x="58" y="316" fill="${theme.text}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="42" letter-spacing="3">${number}</text>
  <text x="58" y="392" fill="${theme.muted}" font-family="Arial, sans-serif" font-size="16">CARDHOLDER</text>
  <text x="58" y="427" fill="${theme.text}" font-family="Arial, sans-serif" font-size="25" font-weight="600">${holder}</text>
  <text x="528" y="392" fill="${theme.muted}" font-family="Arial, sans-serif" font-size="16">EXPIRES</text>
  <text x="528" y="427" fill="${theme.text}" font-family="Arial, sans-serif" font-size="25" font-weight="600">${expiry}</text>
  <text x="798" y="402" text-anchor="end" fill="${theme.muted}" font-family="Arial, sans-serif" font-size="15">${kind}</text>
  <text x="798" y="440" text-anchor="end" fill="${theme.text}" font-family="Arial, sans-serif" font-size="30" font-weight="800">${network}</text>
  <text x="58" y="495" fill="${theme.muted}" font-family="Arial, sans-serif" font-size="14" letter-spacing="2">NOT FOR PAYMENT</text>
</svg>`;
}
