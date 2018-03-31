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

class App extends React.Component<any, any> {
  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Nav routesConfig={routesConfig} />
          <Switch>{getRouterRoutes(routesConfig)}</Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
