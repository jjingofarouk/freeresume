import { StyleSheet } from "@react-pdf/renderer";

// Modernized spacing system inspired by Tailwind CSS, converted from rem to pt (1rem = 12pt)
export const spacing = {
  0: "0",
  0.5: "1.5pt",
  1: "3pt",
  1.5: "4.5pt",
  2: "6pt",
  2.5: "7.5pt",
  3: "9pt",
  3.5: "10.5pt",
  4: "12pt",
  5: "15pt",
  6: "18pt",
  7: "21pt",
  8: "24pt",
  9: "27pt",
  10: "30pt",
  11: "33pt",
  12: "36pt",
  14: "42pt",
  16: "48pt",
  20: "60pt",
  24: "72pt",
  28: "84pt",
  32: "96pt",
  36: "108pt",
  40: "120pt",
  44: "132pt",
  48: "144pt",
  52: "156pt",
  56: "168pt",
  60: "180pt",
  64: "192pt",
  72: "216pt",
  80: "240pt",
  96: "288pt",
  full: "100%",
} as const;

export const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    gap: spacing[2],
  },
  flexRowBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    gap: spacing[3],
  },
  icon: {
    width: "14pt",
    height: "14pt",
    fill: "#4b5563", // Modernized neutral color (gray-600)
    opacity: 0.9,
  },
});