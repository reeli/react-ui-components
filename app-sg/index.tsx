import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Route,
  Switch,
} from 'react-router';

const Home = () => (
  <div>Home</div>
);

class App extends React.Component<any, any> {
  render() {
    return (
      <Switch>
        <Route path='/' component={Home}/>
      </Switch>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
