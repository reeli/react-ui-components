import { createBrowserHistory } from "history";
import React from "react";
import { render } from "react-dom";
import { Router, Switch } from "react-router";
import { Nav } from "./components/Nav";
import { getRouterRoutes } from "./getRouterRoutes";
import { routesConfig } from "./getRoutesConfig";
import { ThemeContext } from "./ThemeContext";
import { css, Global } from "@emotion/core";

const browserHistory = createBrowserHistory();

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

class App extends React.Component<any, any> {
  state = {
    theme: "dark",
  };

  render() {
    return (
      <Router history={browserHistory}>
        <div css={containerStyles}>
          <Global
            styles={css`
              body {
                font-family: "Roboto", "Helvetica", "Arial", sans-serif;
              }
            `}
          />
          <ThemeContext.Provider
            value={{
              theme: this.state.theme,
              toggleTheme: () => {
                this.setState({
                  theme: this.state.theme === "light" ? "dark" : "light",
                });
              },
            }}
          >
            <Nav routesConfig={routesConfig} />
          </ThemeContext.Provider>
          <main css={mainStyles}>
            <Switch>{getRouterRoutes(routesConfig)}</Switch>
          </main>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById("app"));
