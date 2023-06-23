import { PropertiesFallback, SimplePseudos } from "csstype";
import { extensions } from "../CSSExtension";
import { defaultTheme } from "../defaultTheme";

export type Theme = typeof defaultTheme;

export type CSSProperties = PropertiesFallback<string | number>;

type RecursiveCSSPseudo<D> = {
  [K in keyof SimplePseudos]?: D;
};

type CSSDefinition<D> = D | RecursiveCSSProperties<D>;

interface RecursiveCSSProperties<D> {
  [prop: string]: CSSDefinition<D>;
}

type CSSPropertiesWithExtensions = Omit<CSSProperties, "color"> &
  Partial<{ [K in keyof typeof extensions]: Parameters<typeof extensions[K]>[1] }>;

type RecursiveCSSObject<D> = D & (RecursiveCSSPseudo<D> | RecursiveCSSProperties<D>);

export type AllCSSProperties = RecursiveCSSObject<CSSPropertiesWithExtensions>;
