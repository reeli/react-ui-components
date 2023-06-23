import { color, fontWeight } from "./";

type StringOnly<K> = Exclude<K, symbol>;

export class DesignToken<ThemeName extends string> {
  static of<ThemeName extends string>(themeName: ThemeName) {
    return new DesignToken(themeName);
  }

  constructor(private themeName: ThemeName) {}

  toTokens<TValues extends Record<string, string | number>, TProperty extends string>(
    values: TValues,
    property: TProperty,
  ) {
    return Object.keys(values).reduce((res, k) => {
      return {
        ...res,
        [k]: `${this.themeName}.${property}.${k}`,
      };
    }, {} as { [K in keyof TValues]: `${ThemeName}.${TProperty}.${StringOnly<K>}` });
  }

  color(values: typeof color) {
    return {
      values: values,
      tokens: this.toTokens(values, "color"),
      on: [],
    };
  }

  fontWeight(values: typeof fontWeight) {
    return {
      values: values,
      tokens: this.toTokens(values, "fontWeight"),
      on: [],
    };
  }
}
