import { css } from 'glamor';
import { map } from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';

const navItemStyles = css({
  fontSize: '1rem',
  color: '#222',
  display: 'block',
  margin: '0.5rem 0',
});

export const Nav = ({ routesConfig }: { routesConfig: any[] }) => (
  <aside>
    {map(routesConfig, (routeConfig: any, idx: number) => (
      <Link to={routeConfig.path} key={idx} {...navItemStyles}>
        {routeConfig.path.split('/')[1]}
      </Link>
    ))}
  </aside>
);