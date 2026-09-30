export type CardNetwork =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "jcb"
  | "diners"
  | "unionpay"
  | "maestro";

export type CardKind =
  | "credit"
  | "debit"
  | "prepaid"
  | "virtual"
  | "business"
  | "gift";

export type CardTheme = "midnight" | "slate" | "aurora" | "ember";

export interface NetworkDefinition {
  label: string;
  prefix: string;
  length: number;
  cvcLength: number;
}

export interface GenerateCardOptions {
  network?: CardNetwork;
  kind?: CardKind;
  holder?: string;
  issuer?: string;
  seed?: string;
}

export interface MockCard {
  number: string;
  holder: string;
  expiry: string;
  cvc: string;
  network: CardNetwork;
  networkLabel: string;
  kind: CardKind;
  issuer: string;
  seed: string;
  testOnly: true;
}

export interface RenderOptions {
  theme?: CardTheme;
}
