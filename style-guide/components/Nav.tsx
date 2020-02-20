import { map } from "lodash";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import { css } from "@emotion/core";

const navItemStyles = css({
  fontSize: "1rem",
  color: "#222",
  display: "block",
  margin: "0.5rem 0",
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
});

const asideStyles = css({
  width: "240px",
  opacity: 0.7,
  overflowY: "scroll",
});

const linkStyles = css({
  color: "#fff",
  padding: "0.5rem 1rem",
});

const getActiveLinkStyles = (theme: string) => ({
  background: theme === "dark" ? "#545659" : "#e07070",
});

export const Nav = ({ routesConfig }: { routesConfig: any[] }) => {
  const location = useLocation();
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <aside css={[{ background: theme === "dark" ? "#000" : "red" }, asideStyles]}>
          <div
            onClick={() => toggleTheme()}
            css={[
              navItemStyles,
              {
                color: "#fff",
                cursor: "pointer",
                textAlign: "right",
                paddingRight: "1rem",
              },
            ]}
          >
            Toggle Theme
          </div>
          {map(routesConfig, (routeConfig: any, idx: number) => (
            <Link
              to={routeConfig.path}
              key={idx}
              css={[
                navItemStyles,
                linkStyles,
                {
                  ":hover,:focus": getActiveLinkStyles(theme),
                },
                routeConfig.path === location.pathname ? getActiveLinkStyles(theme) : {},
              ]}
            >
              {routeConfig.path.split("/")[1]}
            </Link>
          ))}
        </aside>
      )}
    </ThemeContext.Consumer>
  );
};
