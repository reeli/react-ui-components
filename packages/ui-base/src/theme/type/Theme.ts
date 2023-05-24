import { color, fontFamily, fontWeight, rounded } from "../";

type FontType = "display" | "headline" | "title" | "label" | "body";
type FontSize = "Large" | "Medium" | "Small";
export type Font = `${FontType}${FontSize}`;
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface Theme {
  color: typeof color;
  fontFamily: typeof fontFamily;
  fontWeight: typeof fontWeight;
  rounded: typeof rounded;
  font: Record<Font, {
    fontSize: string,
    fontFamily: (t: Theme) => string;
    fontWeight: (t: Theme) => number;
    lineHeight: string;
    letterSpacing: string;
  }>;
  spacing: number;
}
