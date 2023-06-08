import { ElementType, useContext, PropsWithChildren, DOMAttributes, forwardRef } from "react";
import { AllCSSProperties, ThemeContext } from ".";

// @ts-ignore
import { jsx, jsxs } from "@emotion/react/jsx-runtime";

interface BoxProps extends DOMAttributes<any> {
  component: ElementType;
  sx: AllCSSProperties;
}

export const Box = forwardRef<HTMLElement, PropsWithChildren<BoxProps>>(
  ({ component = "div", sx, ...otherProps }, ref) => {
    const { themeFactory } = useContext(ThemeContext);

    if (Array.isArray((otherProps as any)["children"])) {
      return jsxs(component, {
        ...otherProps,
        css: themeFactory.convert(sx),
        ref,
      });
    }

    return jsx(component, {
      ...otherProps,
      css: themeFactory.convert(sx),
      ref,
    });
  },
);
