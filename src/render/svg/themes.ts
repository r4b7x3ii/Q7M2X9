import type { CardTheme } from "../../types/index.js";

export interface ThemeDefinition {
  from: string;
  to: string;
  text: string;
  muted: string;
}

export const THEMES: Readonly<Record<CardTheme, ThemeDefinition>> = Object.freeze({
  midnight: {
    from: "#111827",
    to: "#312e81",
    text: "#f9fafb",
    muted: "#c7d2fe"
  },
  slate: {
    from: "#1f2937",
    to: "#475569",
    text: "#f8fafc",
    muted: "#cbd5e1"
  },
  aurora: {
    from: "#0f766e",
    to: "#4338ca",
    text: "#f8fafc",
    muted: "#ccfbf1"
  },
  ember: {
    from: "#7c2d12",
    to: "#7f1d1d",
    text: "#fff7ed",
    muted: "#fed7aa"
  }
});

export function listThemes(): CardTheme[] {
  return Object.keys(THEMES) as CardTheme[];
}
