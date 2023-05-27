import { createContext, useContext } from "react";
import { ThemeFactory } from "./";

export const ThemeContext = createContext({
  themeFactory: {} as unknown as ThemeFactory,
});

export const useThemeFactory = () => {
  const { themeFactory } = useContext(ThemeContext);
  return themeFactory;
};

export const useTheme = () => {
  const { themeFactory } = useContext(ThemeContext);
  return themeFactory.theme;
};

export const ThemeProvider = ThemeContext.Provider;
