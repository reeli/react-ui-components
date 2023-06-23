import { defaultTheme } from "./defaultTheme";
import { CSSPropertyGetter, getColorByBackgroundColor } from "./utils";
import { Properties } from "csstype";
import { CSSProperties, Theme } from "./type";

type ValueOfStyle = string | number;
type AliasCallback<T = ValueOfStyle> = (theme: typeof defaultTheme, v: T) => CSSProperties;

const CSSProperty = CSSPropertyGetter<Properties>();

export class Extension {
  constructor() {}

  static mixin = <T>(callback: AliasCallback<T>): AliasCallback<T> => {
    return (theme: Theme, value: T) => callback(theme, value);
  };

  static builtIn() {
    const alias = {
      font: [CSSProperty.fontFamily],

      shadow: [CSSProperty.boxShadow],

      rounded: [CSSProperty.borderRadius],
      roundedTop: [CSSProperty.borderTopLeftRadius, CSSProperty.borderTopRightRadius],
      roundedBottom: [CSSProperty.borderBottomLeftRadius, CSSProperty.borderBottomRightRadius],
      roundedLeft: [CSSProperty.borderTopLeftRadius, CSSProperty.borderBottomLeftRadius],
      roundedRight: [CSSProperty.borderTopRightRadius, CSSProperty.borderBottomRightRadius],

      bg: [CSSProperty.background],
      bgImage: [CSSProperty.backgroundImage],
      bgSize: [CSSProperty.backgroundSize],
      bgPosition: [CSSProperty.backgroundPosition],
      bgRepeat: [CSSProperty.backgroundRepeat],
      bgAttachment: [CSSProperty.backgroundAttachment],
      bgColor: [CSSProperty.backgroundColor],
      // bgGradient: [CSSProperty.backgroundGradient],
      bgClip: [CSSProperty.backgroundClip],

      pos: [CSSProperty.position],

      p: [CSSProperty.padding],
      pt: [CSSProperty.paddingTop],
      pr: [CSSProperty.paddingRight],
      pl: [CSSProperty.paddingLeft],
      pb: [CSSProperty.paddingBottom],
      ps: [CSSProperty.paddingInlineStart],
      pe: [CSSProperty.paddingInlineEnd],
      px: [CSSProperty.paddingLeft, CSSProperty.paddingRight],
      py: [CSSProperty.paddingTop, CSSProperty.paddingBottom],

      m: [CSSProperty.margin],
      mt: [CSSProperty.marginTop],
      mr: [CSSProperty.marginRight],
      ml: [CSSProperty.marginLeft],
      mb: [CSSProperty.marginBottom],
      ms: [CSSProperty.marginInlineStart],
      me: [CSSProperty.marginInlineEnd],
      mx: [CSSProperty.marginLeft, CSSProperty.marginRight],
      my: [CSSProperty.marginTop, CSSProperty.marginBottom],

      w: [CSSProperty.width],
      minW: [CSSProperty.minWidth],
      maxW: [CSSProperty.maxWidth],

      h: [CSSProperty.height],
      minH: [CSSProperty.minHeight],
      maxH: [CSSProperty.maxHeight],
    };

    return Object.keys(alias).reduce((res, name) => {
      return {
        ...res,
        [name]: (_: Theme, value: string | number) => {
          return (alias as any)[name].reduce(
            (styles: { [K: string]: Properties }, prop: string) => ({
              ...styles,
              [prop]: value,
            }),
            {},
          );
        },
      };
    }, {}) as unknown as { [K in keyof typeof alias]: AliasCallback };
  }
}

console.log(Extension.builtIn().px({} as any, 10), "Extension.builtIn()");
export const extensions = {
  ...Extension.builtIn(),
  textStyle: Extension.mixin<keyof Theme["font"]>((theme, value) => {
    const font = (theme.font as any)[value];
    return {
      fontSize: font.fontSize,
      fontFamily: font.fontFamily,
      fontWeight: font.fontWeight,
      lineHeight: font.lineHeight,
      letterSpacing: font.letterSpacing,
    };
  }),
  containerStyle: Extension.mixin<keyof Theme["color"]>((theme, bgColor) => {
    return {
      backgroundColor: (theme.color as any)[bgColor],
      color: getColorByBackgroundColor(bgColor, theme.color),
    };
  }),
  color: Extension.mixin<keyof Theme["color"]>((theme: Theme, color) => {
    return {
      color: (theme.color as any)[color],
      fill: (theme.color as any)[color],
    };
  }),
};
