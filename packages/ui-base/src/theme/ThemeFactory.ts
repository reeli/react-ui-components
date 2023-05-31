import { isFunction, capitalize, isNumber } from "lodash";
import { Theme, CSSPropsWithExtensions } from ".";
import { Properties } from "csstype";

const CSSPropNameGetter = <T extends Record<string, any>>(): { [K in keyof T]: T[K] } => {
  return new Proxy({} as T, {
    get(_, k) {
      return k;
    },
  });
};

interface ThemeOptions {
  createSpacing: (value: number) => string;
}

const defaultCreateSpacing = (value: number) => `${value * 0.1}rem`;

const cssPropNameGetter = CSSPropNameGetter<Properties>();

export class ThemeFactory {
  static of(theme: Theme, themeOptions: ThemeOptions = { createSpacing: defaultCreateSpacing }) {
    return new ThemeFactory(theme, themeOptions);
  }

  private extensions = {
    p: [cssPropNameGetter.padding],
    px: [cssPropNameGetter.paddingLeft, cssPropNameGetter.paddingRight],
    py: [cssPropNameGetter.paddingTop, cssPropNameGetter.paddingBottom],
    m: [cssPropNameGetter.margin],
    mx: [cssPropNameGetter.marginLeft, cssPropNameGetter.marginRight],
    my: [cssPropNameGetter.marginTop, cssPropNameGetter.marginBottom],
    textStyle: [
      cssPropNameGetter.fontSize,
      cssPropNameGetter.fontFamily,
      cssPropNameGetter.fontWeight,
      cssPropNameGetter.lineHeight,
      cssPropNameGetter.letterSpacing,
    ],
    containerStyle: [cssPropNameGetter.backgroundColor, cssPropNameGetter.color],
    rounded: [cssPropNameGetter.borderRadius],
    roundedTop: [cssPropNameGetter.borderTopLeftRadius, cssPropNameGetter.borderTopRightRadius],
    roundedBottom: [cssPropNameGetter.borderBottomLeftRadius, cssPropNameGetter.borderBottomRightRadius],
    roundedLeft: [cssPropNameGetter.borderTopLeftRadius, cssPropNameGetter.borderBottomLeftRadius],
    roundedRight: [cssPropNameGetter.borderTopRightRadius, cssPropNameGetter.borderBottomRightRadius],
  };

  constructor(public theme: Theme, private themeOptions: ThemeOptions) {}

  private getExtensionByProp(k: keyof typeof this.extensions): any[] {
    return this.extensions[k];
  }

  private isExtensionProp(x: string): x is keyof typeof this.extensions {
    return Object.keys(this.extensions).includes(x);
  }

  private getExtensionStyle = (
    styles: CSSPropsWithExtensions,
    extensionProp: keyof typeof this.extensions,
    cssProp: keyof Properties,
  ) => {
    const value = styles[extensionProp];

    if (extensionProp === "textStyle") {
      const f = (this.theme.font as any)[value!][cssProp];
      return isFunction(f) ? f(this.theme) : this.convertLengthValue(cssProp, f);
    }

    return this.convertLengthValue(extensionProp, value as any);
  };

  private isLengthAttr(prop: string) {
    const lengthAttrs = [
      "px",
      "py",
      "mx",
      "my",
      cssPropNameGetter.margin,
      cssPropNameGetter.padding,
      cssPropNameGetter.fontSize,
      cssPropNameGetter.lineHeight,
      cssPropNameGetter.letterSpacing,
      "rounded",
    ];
    return lengthAttrs.includes(prop);
  }

  private convertLengthValue(prop: string, value: string | number) {
    if (this.isLengthAttr(prop) && isNumber(value)) {
      return this.themeOptions.createSpacing(value);
    }
    return value;
  }

  private getColorByBackgroundColor(bgColor: string) {
    if (bgColor.startsWith("surface")) {
      return this.theme.color["onSurface"];
    }
    return (this.theme.color as any)[`on${capitalize(bgColor)}`];
  }

  public convert = (styles: CSSPropsWithExtensions, disabled: boolean = false): Properties => {
    return Object.keys(styles).reduce((results, prop) => {
      if (prop.startsWith("_")) {
        if (prop == "_disabled") {
          return {
            ...results,
            ...(disabled ? this.convert((styles as any)[prop], disabled) : {}),
          };
        }

        return {
          ...results,
          [`&:${prop.slice(1)}`]: this.convert((styles as any)[prop], disabled),
        };
      }

      if (this.isExtensionProp(prop)) {
        if (prop === "containerStyle") {
          const bgColor = styles[prop] || "primary";
          return {
            ...results,
            backgroundColor: this.theme.color[bgColor],
            color: this.getColorByBackgroundColor(bgColor),
          };
        }

        const customProps = this.getExtensionByProp(prop).reduce((res, cssProp) => {
          return {
            ...res,
            [cssProp]: this.getExtensionStyle(styles, prop, cssProp),
          };
        }, {});

        return {
          ...results,
          ...customProps,
        };
      }

      return {
        ...results,
        [prop]: this.convertLengthValue(prop, (styles as any)[prop]),
      };
    }, {});
  };
}
