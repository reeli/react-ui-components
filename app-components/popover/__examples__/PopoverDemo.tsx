import { css } from 'glamor';
import * as React from 'react';
import { Placement } from '../../core/OverlayTrigger';
import { Popover } from '../Popover';

export class PopoverDemo extends React.Component<any, any> {
  render() {
    return (
      <>
        <Popover width="330px" content="Purchase or reload your card, get ¥10 extra!" placement={Placement.leftBottom}>
          {({ open }) => (
            <span {...css({ marginLeft: '23rem' })} onClick={open}>
              Popover Left
            </span>
          )}
        </Popover>
        <Popover width="330px" content="Purchase or reload your card, get ¥10 extra!" placement={Placement.leftBottom}>
          {({ open }) => (
            <span {...css({ marginLeft: '23rem' })} onClick={open}>
              Popover Right
            </span>
          )}
        </Popover>
      </>
    );
  }
}
