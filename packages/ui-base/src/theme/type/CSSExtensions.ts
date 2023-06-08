import { Properties, type PropertiesFallback } from "csstype";
import { Theme } from ".";
import { getColorByBackgroundColor } from "../utils";

const CSSPropertyGetter = <T extends Record<string, any>>(): { [K in keyof T]: T[K] } => {
  return new Proxy({} as T, {
    get(_, k) {
      return k;
    },
  });
};

export const cssProperty = CSSPropertyGetter<Properties>();
export const extensions = {
  p: (_: any, value: string | number) => ({
    padding: value,
  }),
  px: (_: any, value: string | number) => {
    return {
      paddingLeft: value,
      paddingRight: value,
    };
  },
  py: (_: any, value: string | number) => {
    return {
      paddingTop: value,
      paddingBottom: value,
    };
  },
  m: (_: any, value: string | number) => ({
    margin: value,
  }),
  mx: (_: any, value: string | number) => ({ marginLeft: value, marginRight: value }),
  my: (_: any, value: string | number) => ({ marginTop: value, marginBottom: value }),
  textStyle: (theme: Theme, value: keyof Theme["font"]) => {
    const font = (theme.font as any)[value];
    return {
      fontSize: font.fontSize,
      fontFamily: font.fontFamily,
      fontWeight: font.fontWeight,
      lineHeight: font.lineHeight,
      letterSpacing: font.letterSpacing,
    };
  },
  containerStyle: (theme: Theme, bgColor: keyof Theme["color"]) => {
    return ({
      backgroundColor: (theme.color as any)[bgColor],
      color: getColorByBackgroundColor(bgColor, theme.color)
    });
  },
  rounded: (_: any, value: string | number) => {
    return {
      borderRadius: value,
    };
  },
  roundedTop: (_: any, value: string | number) => {
    return { borderTopLeftRadius: value, borderTopRightRadius: value };
  },
  roundedBottom: (_: any, value: string | number) => {
    return { borderBottomLeftRadius: value, borderBottomRightRadius: value };
  },
  roundedLeft: (_: any, value: string | number) => {
    return {
      borderTopLeftRadius: value,
      borderBottomLeftRadius: value,
    };
  },
  roundedRight: (_: any, value: string | number) => {
    return {
      borderTopRightRadius: value,
      borderBottomRightRadius: value,
    };
  },
};

export type CSSProperties = PropertiesFallback<string | number>;
type CSSPropertiesWithExtensions = CSSProperties &
  Partial<{ [K in keyof typeof extensions]: Parameters<typeof extensions[K]>[1] }>;

export type AllCSSProperties = CSSPropertiesWithExtensions & {
  [K: string]: CSSPropertiesWithExtensions;
};
