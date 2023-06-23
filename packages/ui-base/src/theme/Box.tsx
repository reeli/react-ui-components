import { ElementType, useContext, PropsWithChildren, DOMAttributes, forwardRef } from "react";
import { AllCSSProperties, ThemeContext, isArray } from ".";
import { reduce } from "lodash";
// @ts-ignore
import { jsx, jsxs } from "@emotion/react/jsx-runtime";

interface BoxProps extends DOMAttributes<any> {
  component: ElementType;
  sx: AllCSSProperties[] | AllCSSProperties;
}

const handleSx = (sx: AllCSSProperties[] | AllCSSProperties) => {
  if (isArray<AllCSSProperties>(sx)) {
    return reduce(
      sx,
      (res, item) => {
        return {
          ...res,
          ...item,
        };
      },
      {} as AllCSSProperties,
    );
  }

  return sx;
};

export const Box = forwardRef<HTMLElement, PropsWithChildren<BoxProps>>(
  ({ component = "div", sx, ...otherProps }, ref) => {
    const { themeFactory } = useContext(ThemeContext);

    if (Array.isArray((otherProps as any)["children"])) {
      return jsxs(component, {
        ...otherProps,
        css: themeFactory.convert(handleSx(sx)),
        ref,
      });
    }

    return jsx(component, {
      ...otherProps,
      css: themeFactory.convert(handleSx(sx)),
      ref,
    });
  },
);
