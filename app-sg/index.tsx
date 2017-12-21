import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';

class App extends Component<any, any> {
  render() {
    return (
      <div>app</div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));