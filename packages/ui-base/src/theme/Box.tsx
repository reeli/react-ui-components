import { ElementType, FC } from "react";
import { ThemeFactory } from "packages/ui-base/src/theme/ThemeFactory";
import { useTheme } from "./ThemeContext";
import styled from "@emotion/styled";
import { CSSPropsWithExtensions } from "packages/ui-base/src/theme/type";

interface BoxProps {
  component: ElementType;
  sx: CSSPropsWithExtensions;
}

const BoxRoot = styled("div")();
export const Box: FC<BoxProps> = ({ component = "span", sx }) => {
  const theme = useTheme();

  return <BoxRoot as={component} theme={theme} style={ThemeFactory.of(theme).convert(sx)} />;
};
