import { isNumber, isObject } from "lodash";
import { AllCSSProperties, CSSProperties, Theme } from ".";
import { Properties } from "csstype";

interface ThemeOptions {
  createSpacing: (value: number) => string;
  extensions: {
    [K: string]: (theme: Theme, value: string) => CSSProperties;
  };
}

const defaultCreateSpacing = (value: number) => `${value * 0.1}rem`;

export class ThemeFactory {
  static of(
    theme: Theme,
    themeOptions: ThemeOptions = {
      createSpacing: defaultCreateSpacing,
      extensions: {},
    },
  ) {
    return new ThemeFactory(theme, themeOptions);
  }

  constructor(public theme: Theme, private themeOptions: ThemeOptions) {}

  private isExtensionProp(x: string): x is string {
    return Object.keys(this.themeOptions.extensions).includes(x);
  }

  private isLengthAttr(prop: string) {
    const lengthAttrs = [
      "px",
      "py",
      "mx",
      "my",
      "margin",
      "padding",
      "fontSize",
      "lineHeight",
      "letterSpacing",
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

  public convert = (styles: AllCSSProperties): Properties => {
    return Object.keys(styles).reduce((results, prop) => {
      if (isObject((styles as any)[prop])) {
        return {
          ...results,
          [prop]: this.convert((styles as any)[prop]),
        };
      }

      if (this.isExtensionProp(prop)) {
        const obj = (this.themeOptions.extensions[prop] as any)(this.theme, (styles as any)[prop]);
        return {
          ...results,
          ...Object.keys(obj).reduce((v, i) => {
            return {
              ...v,
              [i]: this.convertLengthValue(i, obj[i]),
            };
          }, {}),
        };
      }

      return {
        ...results,
        [prop]: this.convertLengthValue(prop, (styles as any)[prop]),
      };
    }, {});
  };
}
