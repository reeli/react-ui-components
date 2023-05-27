import { render } from "react-dom";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { routesConfig } from "./getRoutesConfig";
import { getRouterRoutes } from "./getRouterRoutes";
import { css, Global } from "@emotion/react";
import { useState } from "react";
import { Button } from "@ui/core";
import { ThemeContext, defaultTheme } from "@ui/base";
import { ThemeFactory } from "@ui/base/src/theme/ThemeFactory";

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

const themeFactory = ThemeFactory.of(defaultTheme, { createSpacing: (v) => `${v * 0.1}rem` });

const App = () => {
  const [show, setShow] = useState(true);

  return (
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
          `}
        />
        {show && (
          <ThemeContext.Provider
            value={{
              themeFactory,
            }}
          >
            <Nav routesConfig={routesConfig} />
          </ThemeContext.Provider>
        )}
        <main css={mainStyles}>
          <Routes>{getRouterRoutes(routesConfig)}</Routes>
          <div css={{ position: "absolute", left: 0, bottom: 0, zIndex: 2000 }}>
            <Button onClick={() => setShow((prev) => !prev)}>menu</Button>
          </div>
        </main>
      </div>
    </Router>
  );
};

render(<App />, document.getElementById("app"));
