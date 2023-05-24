import { Font } from ".";
import { type Properties } from "csstype";

interface CssExtensions {
  p: number;
  px: number;
  py: number;
  m: number;
  mx: number;
  my: number;
  g: number;
  textStyle: Font;
}

export type CSSPropsWithExtensions = Properties & Partial<CssExtensions>;

