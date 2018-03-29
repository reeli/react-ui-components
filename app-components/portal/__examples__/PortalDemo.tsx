import * as React from 'react';
import { Portal } from '../Portal';

export class PortalDemo extends React.Component<any, any> {
  state = {
    isOpen: false,
  };

  render() {
    return (
      <div>
        <Portal
          isOpen={this.state.isOpen}
          triggerOn={({ toggle }) => <button onClick={toggle}>test</button>}
          beforeClose={() => {
            console.log('before close');
          }}
        >
          {({ close }) => (
            <span>
              gooooooooooooood!! <span onClick={close}>X</span>
            </span>
          )}
        </Portal>
        <div
          onClick={() => {
            this.setState({
              isOpen: true,
            });
          }}
        >
          {' '}
          click to open
        </div>
      </div>
    );
  }
}
