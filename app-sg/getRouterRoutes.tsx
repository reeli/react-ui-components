import { css } from 'glamor';
import * as React from 'react';
import {
  Route,
  RouteProps,
} from 'react-router';

const mainStyles = css({
  padding: '1rem',
  width: '100%',
});

export const getRouterRoutes = (routes: RouteProps[]) => {
  return (
    <main {...mainStyles}>
      {routes.map((route: RouteProps, idx: number) => {
        return <Route path={route.path} component={route.component} key={idx} />;
      })}
    </main>
  );
};