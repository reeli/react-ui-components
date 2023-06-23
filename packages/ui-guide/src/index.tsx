import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { routesConfig } from "./getRoutesConfig";
import { getRouterRoutes } from "./getRouterRoutes";
import { css, Global } from "@emotion/react";
import { Button } from "@ui/core";
import { ThemeProvider, defaultTheme, ThemeFactory, extensions, ThemeOptions } from "@ui/base";
import { createRoot } from "react-dom/client";

const containerStyles = css({
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  display: "flex",
});

const mainStyles = css({
  padding: "1rem",
  flex: 1,
  overflow: "scroll",
});

const themeFactory = ThemeFactory.of(defaultTheme, {
  createSpacing: (v) => `${v * 0.1}rem`,
  extensions: extensions as ThemeOptions["extensions"],
});

const App = () => {
  return (
    <ThemeProvider
      value={{
        themeFactory,
      }}
    >
      <Router>
        <div css={containerStyles}>
          <Global
            styles={css`
              html {
                font-size: 10px;
              }

              body {
                font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                font-size: 1.4rem;
              }
              button {
                border: none;
              }
            `}
          />

          <Nav routesConfig={routesConfig} />
          <main css={mainStyles}>
            <Routes>{getRouterRoutes(routesConfig)}</Routes>
            <div css={{ position: "absolute", left: 0, bottom: 0, zIndex: 2000 }}>
              <Button>menu</Button>
            </div>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

const domNode = document.getElementById("app")!;
const root = createRoot(domNode);
root.render(<App />);
