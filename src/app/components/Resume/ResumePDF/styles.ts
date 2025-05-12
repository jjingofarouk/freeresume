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
    alignItems: "center",
  },
  flexRowBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing[0.5],
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    gap: spacing[2], // Reduced gap for tighter grouping
  },
  icon: {
    width: "12pt",
    height: "12pt",
    fill: "#1b263b", // --theme-navy for consistency with global theme
    opacity: 0.9, // Slightly higher opacity for better visibility
  },
  section: {
    backgroundColor: "#f1f5f9", // --theme-light-gray
    borderRadius: 4,
    padding: spacing[3],
    marginBottom: spacing[4],
  },
  card: {
    backgroundColor: "#ffffff",
    borderLeft: "2px solid #2a9d8f", // --theme-emerald
    padding: spacing[2],
    borderRadius: 2,
    marginBottom: spacing[2],
  },
  textPrimary: {
    color: "#2a9d8f", // --theme-emerald
    fontSize: 10,
    fontWeight: "medium",
  },
  textSecondary: {
    color: "#0f172a", // --theme-black
    fontSize: 9,
    opacity: 0.85,
  },
  textHeading: {
    color: "#1b263b", // --theme-navy
    fontSize: 12,
    fontWeight: "bold",
  },
});