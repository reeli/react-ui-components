import * as React from 'react';
import {
  Route,
  RouteProps,
} from 'react-router';

export const getRouterRoutes = (routes: RouteProps[]) => {
  return (
    routes.map((route: RouteProps, idx: number) => {
      return <Route path={route.path} component={route.component} key={idx} />;
    })
  );
};