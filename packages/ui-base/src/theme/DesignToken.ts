import { isFunction } from "lodash";
import  {type Properties} from "csstype";

const color = {
  primary: "",
  onPrimary: "",
  primaryContainer: "",
};

const fontFamily = {
  brand: "brand",
  plain: "plain",
};

const fontWeight = {
  bold: 700,
  medium: 400,
  light: 300,
};

const rounded = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};


type FontType = "display" | "headline" | "title" | "label" | "body";
type FontSize = "Large" | "Medium" | "Small";
type Font = `${FontType}${FontSize}`;
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface ThemeTemplate {
  color: typeof color;
  fontFamily: typeof fontFamily;
  fontWeight: typeof fontWeight;
  font: Record<Font, {
    fontSize: string,
    fontFamily: (t: ThemeTemplate) => string;
    fontWeight: (t: ThemeTemplate) => number;
    lineHeight: string;
    letterSpacing: string;
  }>;
  spacing: number;
  rounded: typeof rounded;
}

export const defaultTheme: ThemeTemplate = {
  color,
  fontFamily,
  fontWeight,
  font: {
    displayLarge: {
      fontSize: "57px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
    displayMedium: {
      fontSize: "37px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
    displaySmall: {
      fontSize: "57px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
    headlineLarge: {
      fontSize: "57px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
    headlineMedium: {
      fontSize: "57px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
    headlineSmall: {
      fontSize: "57px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
    titleLarge: {
      fontSize: "57px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
    titleMedium: {
      fontSize: "57px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
    titleSmall: {
      fontSize: "57px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
    labelLarge: {
      fontSize: "57px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
    labelMedium: {
      fontSize: "57px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
    labelSmall: {
      fontSize: "57px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
    bodyLarge: {
      fontSize: "57px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
    bodyMedium: {
      fontSize: "27", // 单位用 rem 还是 px
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "10px",
      letterSpacing: "5px",
    },
    bodySmall: {
      fontSize: "57px",
      fontFamily: (t: ThemeTemplate) => t.fontFamily.brand,
      fontWeight: (t: ThemeTemplate) => t.fontWeight.bold,
      lineHeight: "23px",
      letterSpacing: "",
    },
  },
  spacing: 4,
  rounded,
};

export interface CssExtensions {
  p: number;
  px: number; // 如何让用户只能输入 0, 1, 2, 3, 4 这样的整数， px * spacing
  py: number;
  m: number;
  mx: number;
  my: number;
  g: number;
  textStyle: Font;
}

class CSSPropsMapping {
  static of() {
    return new CSSPropsMapping();
  }

  values(): Record<string, string[]> {
    return {
      p: ["padding"], // 指定了缩写之后是否还允许使用非缩写方式，比如 padding-left
      px: ["paddingLeft", "paddingRight"],
      py: ["paddingTop", "paddingBottom"],
      m: ["margin"],
      mx: ["marginLeft", "marginRight"],
      my: ["marginTop", "marginBottom"],
      textStyle: ["fontSize", "fontFamily", "fontWeight", "lineHeight", "letterSpacing"],
    };
  };

  getMapping(k: string) {
    return this.values()[k];
  }

  isCustomProp(x: string): boolean {
    return Object.keys(this.values()).includes(x);
  }
}

type CSSProps = {
  [K in keyof Properties]: Properties[K];
};

type CSSExtendedProps = CSSProps & Partial<CssExtensions>;

export const convert = (props: CSSExtendedProps, theme: ThemeTemplate) => {
  const mapping = CSSPropsMapping.of();
  return Object.keys(props).reduce((results, k) => {
    const getValueByKey = (p: string) => {
      const v = (props as any)[k];
      if (k === "textStyle") {
        const f = (theme as any)["font"][v][p];
        return isFunction(f) ? f(theme) : f;
      }
      return v * theme.spacing;
    };

    if (mapping.isCustomProp(k)) {
      const customProps = mapping.getMapping(k).reduce((res, p) => {
        return {
          ...res,
          [p]: getValueByKey(p),
        };
      }, {});

      return {
        ...results,
        ...customProps,
      };
    }

    return {
      ...results,
      [k]: (props as any)[k],
    };
  }, {});
};

