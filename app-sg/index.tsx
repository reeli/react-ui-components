import { css } from 'glamor';
import createBrowserHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Router,
  Switch,
} from 'react-router';
import { Nav } from './components/Nav';
import { getRouterRoutes, } from './getRouterRoutes';
import { routesConfig } from './getRoutesConfig';

const browserHistory = createBrowserHistory();

const containerStyles = css({
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flex: '1 0 auto',
});

const mainStyles = css({
  padding: '1rem',
  width: '100%',
});

class App extends React.Component<any, any> {
  render() {
    return (
      <Router history={browserHistory}>
        <div {...containerStyles}>
          <Nav routesConfig={routesConfig} />
          <main {...mainStyles}>
            <Switch>{getRouterRoutes(routesConfig)}</Switch>
          </main>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
