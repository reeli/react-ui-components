import { defaultTheme } from "../defaultTheme";

type FontType = "display" | "headline" | "title" | "label" | "body";
type FontSize = "Large" | "Medium" | "Small";
export type Font = `${FontType}${FontSize}`;
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type Theme = typeof defaultTheme;
