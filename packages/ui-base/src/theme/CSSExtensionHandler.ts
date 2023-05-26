import { isFunction, capitalize } from "lodash";
import { Theme, CSSPropsWithExtensions } from ".";
import { Properties } from "csstype";

const CSSPropNameGetter = <T extends Record<string, any>>(): { [K in keyof T]: T[K] } => {
  return new Proxy({} as T, {
    get(_, k) {
      return k;
    },
  });
};

const cssPropNameGetter = CSSPropNameGetter<Properties>();

export class CSSExtensionHandler {
  static of(theme: Theme) {
    return new CSSExtensionHandler(theme);
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
  };

  constructor(private theme: Theme) {}

  private getExtensionByProp(k: keyof typeof this.extensions): any[] {
    return this.extensions[k];
  }

  isExtensionProp(x: string): x is keyof typeof this.extensions {
    return Object.keys(this.extensions).includes(x);
  }

  getExtensionStyle = (
    styles: CSSPropsWithExtensions,
    extensionProp: keyof typeof this.extensions,
    cssProp: keyof Properties,
  ) => {
    const value = styles[extensionProp];

    if (extensionProp === "textStyle") {
      const f = (this.theme.font as any)[value!][cssProp];
      return isFunction(f) ? f(this.theme) : f;
    }

    return value;
  };

  getColorByBackgroundColor(bgColor: string) {
    if (bgColor.startsWith("surface")) {
      return this.theme.color["onSurface"];
    }
    return (this.theme.color as any)[`on${capitalize(bgColor)}`];
  }

  convert = (styles: CSSPropsWithExtensions): Properties => {
    return Object.keys(styles).reduce((results, prop) => {
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
        [prop]: (styles as any)[prop],
      };
    }, {});
  };
}