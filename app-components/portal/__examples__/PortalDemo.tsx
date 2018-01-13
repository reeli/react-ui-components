import * as React from 'react';
import { Portal } from '../Portal';

export class PortalDemo extends React.Component<any, any> {
  render() {
    return (
      <Portal triggerOn={({ open }) => <button onClick={open}>test</button>}>
        {() => <span>gooooooooooooood!!</span>}
      </Portal>
    );
  }
}
