import { map } from "lodash";
import { Link, RouteProps, useLocation } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import { css } from "@emotion/react";

const navItemStyles = css({
  fontSize: "1.4rem",
  color: "#222",
  display: "block",
  margin: "0.5rem 0",
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

const group1 = ["/modal", "/popover", "/tooltip", "/portal"];
const group2 = ["/checkbox", "/autocomplete", "/select", "/input", "/with-multi-select"];

const pickGroupFromRouteConfig = (routesConfig: RouteProps[], groupList: string[]) =>
  routesConfig.filter((i) => groupList.includes(i?.path as string));

const pickOtherGroupFromRouteConfig = (routesConfig: RouteProps[], groupList: string[]) =>
  routesConfig.filter((i) => !groupList.includes(i?.path as string));

export const Nav = ({ routesConfig }: { routesConfig: RouteProps[] }) => {
  const location = useLocation();
  const groups = [
    {
      name: "overlay",
      display: "Overlays",
      routes: pickGroupFromRouteConfig(routesConfig, group1),
    },
    {
      names: "inputs",
      display: "Inputs",
      routes: pickGroupFromRouteConfig(routesConfig, group2),
    },
    {
      name: "others",
      display: "Others",
      routes: pickOtherGroupFromRouteConfig(routesConfig, [...group1, ...group2]),
    },
  ];

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
          {map(groups, (group, idx) => (
            <section key={idx}>
              <p
                css={{
                  color: "#fff",
                  paddingLeft: "0.5rem",
                }}
              >
                {group.display}
              </p>
              {map(group.routes, (routeConfig: any, key: number) => (
                <Link
                  to={routeConfig.path}
                  key={key}
                  css={css([
                    navItemStyles,
                    linkStyles,
                    {
                      ":hover,:focus": getActiveLinkStyles(theme),
                    },
                    routeConfig.path === location.pathname ? getActiveLinkStyles(theme) : {},
                  ])}
                >
                  {routeConfig.path.split("/")[1]}
                </Link>
              ))}
            </section>
          ))}
        </aside>
      )}
    </ThemeContext.Consumer>
  );
};
