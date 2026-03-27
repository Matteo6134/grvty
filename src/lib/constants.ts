export const COLORS = {
  light: {
    background: "#f5f0eb",
    foreground: "#1a1a1a",
    accent: "#c9a84c",
    // Gradiente light: toni caldi ambrati, mai troppo chiari
    // gradientStart = nucleo centrale (più saturo)
    // gradientMid   = anello medio
    // gradientEnd   = sfondo periferico (questo diventa bgColor nel shader)
    gradientStart: [0.72, 0.55, 0.18] as [number, number, number], // ambra scura
    gradientMid: [0.82, 0.70, 0.42] as [number, number, number], // oro caldo
    gradientEnd: [0.94, 0.91, 0.86] as [number, number, number], // crema - NON bianco puro
    lampGlow: "#d4b055",
  },
  dark: {
    background: "#0a0a0a",
    foreground: "#f0ebe5",
    accent: "#c9a84c",
    gradientStart: [0.79, 0.66, 0.30] as [number, number, number],
    gradientMid: [0.55, 0.46, 0.19] as [number, number, number],
    gradientEnd: [0.04, 0.04, 0.04] as [number, number, number],
    lampGlow: "#c9a84c",
  },
} as const;

export const RGB_COLORS = [
  "#ef4444", // red
  "#3b82f6", // blue
  "#22c55e", // green
  "#a855f7", // purple
  "#c9a84c", // warm gold
] as const;

export const SCROLL_CONFIG = {
  heroEnd: 0.15,
  levitationEnd: 0.3,
  detailsEnd: 0.65,
  rgbEnd: 0.85,
} as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;