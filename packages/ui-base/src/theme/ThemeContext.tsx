import { createContext, useContext } from "react";
import { defaultTheme } from "./";
import { ThemeFactory } from "./ThemeFactory";

const themeFactory = ThemeFactory.of(defaultTheme, { createSpacing: (v) => `${v * 0.1}rem` });

export const ThemeContext = createContext({
  themeFactory,
});

export const useThemeFactory = () => {
  const { themeFactory } = useContext(ThemeContext);
  return themeFactory;
};

export const useTheme = () => {
  const { themeFactory } = useContext(ThemeContext);
  return themeFactory.theme;
};
