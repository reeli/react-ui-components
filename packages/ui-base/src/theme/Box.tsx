import { ElementType, FC } from "react";
import { CSSExtensionHandler } from "packages/ui-base/src/theme/CSSExtensionHandler";
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

  return <BoxRoot as={component} theme={theme} style={CSSExtensionHandler.of(theme).convert(sx)} />;
};
