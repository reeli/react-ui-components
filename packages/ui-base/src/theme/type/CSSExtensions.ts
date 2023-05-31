import { Font } from ".";
import { type PropertiesFallback } from "csstype";
import { color } from "..";

type PickByPrefix<T, Prefix extends string> = T extends `${Prefix}${string}` ? T : never;
type FilteredKeys<T, Prefix extends string> = Exclude<keyof T, PickByPrefix<keyof T, Prefix>>;

interface CssExtensions {
  p: number;
  px: number;
  py: number;
  m: number;
  mx: number;
  my: number;
  g: number;
  textStyle: Font;
  containerStyle: FilteredKeys<typeof color, "on">;
  rounded: number;
  roundedTop: number;
  roundedBottom: number;
  roundedLeft: number;
  roundedRight: number;
  _hover: Partial<CSSPropsWithExtensions>;
  _focus: Partial<CSSPropsWithExtensions>;
  _active: Partial<CSSPropsWithExtensions>;
  _disabled: Partial<CSSPropsWithExtensions>;
}

export type CSSPropsWithExtensions = PropertiesFallback<string | number> & Partial<CssExtensions>;
