import { Font } from ".";
import { type PropertiesFallback } from "csstype";
import { color } from "..";

interface CssExtensions {
  p: number;
  px: number;
  py: number;
  m: number;
  mx: number;
  my: number;
  g: number;
  textStyle: Font;
  containerStyle: keyof typeof color;
}

export type CSSPropsWithExtensions = PropertiesFallback<string|number> & Partial<CssExtensions>;

