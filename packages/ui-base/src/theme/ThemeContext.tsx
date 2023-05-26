import { createContext, useContext } from "react";
import { defaultTheme } from "./";

export const ThemeContext = createContext({
  theme: defaultTheme,
});

export const useTheme = () => {
  const { theme } = useContext(ThemeContext);
  return theme;
};
