import * as React from 'react';
import { Portal } from '../Portal';

export class PortalDemo extends React.Component<any, any> {
  render() {
    return (
      <Portal
        render={() => {
          return <div>gooooooooooooood!!</div>;
        }}
      >
        {({ open, portal }) => {
          return (
            <div>
              <button onClick={() => open()}>test</button>
              {portal()}
            </div>
          );
        }}
      </Portal>
    );
  }
}
