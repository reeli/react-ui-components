import { css } from 'glamor';
import * as React from 'react';
import { Placement } from '../../core/OverlayTrigger';
import { Popover } from '../Popover';

export class PopoverDemo extends React.Component<any, any> {
  render() {
    return (
      <Popover
        width='330px'
        content='Purchase or reload your card, get ¥10 extra!'
        placement={Placement.leftBottom}
        closeOnOutSide
      >
        <span {...css({ marginLeft: '23rem' })}>
          Popover Bottom
        </span>
      </Popover>
    );
  }
}
