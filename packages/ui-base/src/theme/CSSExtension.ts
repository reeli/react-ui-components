import { defaultTheme } from "./defaultTheme";

interface Mixin {
  name: string;
  value: any;
  type: "mixin";
}

type MixinCallback = (theme: typeof defaultTheme, v: any) => any;

export class MixinFactory {
  constructor(private theme: typeof defaultTheme) {}

  custom = (name: string, callback: MixinCallback): Mixin => {
    return {
      name,
      value: (value: any) => callback(this.theme, value),
      type: "mixin",
    };
  };

  builtIn() {
    const alias: Record<string, any[]> = {
      p: ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom"],
      px: ["paddingLeft", "paddingRight"],
      py: ["paddingTop", "paddingBottom"],
      m: ["marginLeft", "marginRight", "marginBottom", "marginTop"],
      mx: ["marginLeft", "marginRight"],
      my: ["marginBottom", "marginTop"],
      rounded: ["borderRadius"],
    };

    return Object.keys(alias).map((name) => {
      return {
        name: name,
        value: (_: any, v: string) => {
          return alias[name].reduce((res, k) => {
            return {
              ...res,
              [k]: v,
            };
          });
        },
        type: "mixin",
      };
    });
  }
}

const mixin = new MixinFactory(defaultTheme);

export const alias = {
  ...mixin.builtIn(),
  textStyle: mixin.custom("textStyle", (theme) => {
    return theme.font;
  }),
  containerStyle: mixin.custom("containerStyle", (theme, v) => {
    return {
      background: (theme.color as any)[v],
      color: (theme.color as any)[`on${v}`],
    };
  }),
  flex: mixin.custom("flex", () => {
    return {
      display: "flex",
    };
  }),
};
