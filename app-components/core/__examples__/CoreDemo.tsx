import { css } from 'glamor';
import * as React from 'react';
import {
  OverlayTrigger,
  Placement,
} from '../OverlayTrigger';
import { Position } from '../Position';

export class CoreDemo extends React.Component<any, any> {
  render() {
    return (
      <div {...css({ padding: '0 10rem' })}>
        <Position>
          {() => {
            return <div>this is an element</div>;
          }}
        </Position>
        <OverlayTrigger
          content={({ close }) => (
            <span {...css({ width: '120px' })}>
              Overlay content!! <span onClick={close}>XXX</span>
            </span>
          )}
          placement={Placement.left}
        >
          {({ toggle }) => <button onClick={toggle}>Overlay Trigger</button>}
        </OverlayTrigger>
      </div>
    );
  }
}
