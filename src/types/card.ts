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

export interface NetworkDefinition {
  label: string;
  prefix: string;
  numberLength: number;
  cvcLength: number;
  groups: readonly number[];
}

export interface GenerateCardOptions {
  network?: CardNetwork;
  kind?: CardKind;
  holder?: string;
  issuer?: string;
  seed?: string;
  now?: Date;
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
