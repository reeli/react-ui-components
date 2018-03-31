import { css } from 'glamor';
import * as React from 'react';
import { Placement } from '../../core/OverlayTrigger';
import { Tooltip } from '../Tooltip';

export class TooltipDemo extends React.Component<any, any> {
  render() {
    return (
      <Tooltip
        width='330px'
        content='Purchase or reload your card, get ¥10 extra!'
        placement={Placement.leftBottom}
      >
        {({ toggle }) => {
          return <span onClick={toggle} {...css({ marginLeft: '23rem' })}>Trigger Element here</span>
        }}
      </Tooltip>
    );
  }
}
