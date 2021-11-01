import { render } from "react-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Nav } from "./components/Nav";
import { getRouterRoutes } from "./getRouterRoutes";
import { routesConfig } from "./getRoutesConfig";
import { ThemeContext } from "./ThemeContext";
import { css, Global } from "@emotion/react";
import { Button } from "src/button";
import { useState } from "react";

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

const App = () => {
  const [theme, setTheme] = useState("dark");
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
              theme: theme,
              toggleTheme: () => {
                setTheme(theme === "light" ? "dark" : "light");
              },
            }}
          >
            <Nav routesConfig={routesConfig} />
          </ThemeContext.Provider>
        )}
        <main css={mainStyles}>
          <Switch>{getRouterRoutes(routesConfig)}</Switch>
          <div css={{ position: "absolute", left: 0, bottom: 0, zIndex: 2000 }}>
            <Button onClick={() => setShow((prev) => !prev)}>menu</Button>
          </div>
        </main>
      </div>
    </Router>
  );
};

render(<App />, document.getElementById("app"));
