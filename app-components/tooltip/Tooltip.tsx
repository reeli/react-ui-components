import { css } from 'glamor';
import * as React from 'react';
import {
  OverlayTrigger,
  Placement,
} from '../core/OverlayTrigger';
import { IPortalProps } from '../portal/Portal';

interface ITooltip {
  children: IPortalProps['children']
  width?: string
  content?: string | JSX.Element | null
  placement?: Placement,
}

const tooltipStyles = css({
  position: 'absolute',
  zIndex: 1000,
  padding: '8px 0',
});

const tooltipInnerStyles = css({
  backgroundColor: '#4a4a4a',
  color: '#fff',
  fontSize: '14px',
  padding: '.3rem',
});

const arrowUp = css({
  position: 'absolute',
  top: 0,
  left: '10%',
  marginLeft: '-5px',
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent',
  borderBottom: '8px solid #4a4a4a',
  width: 0,
  height: 0,
});


export class Tooltip extends React.Component<ITooltip, any> {
  render() {
    const { width, content, children, placement } = this.props;
    return (
      <OverlayTrigger
        content={() => (
          <div {...css(tooltipStyles, { width })}>
            <div {...arrowUp} />
            <div {...tooltipInnerStyles}>{content}</div>
          </div>
        )}
        placement={placement}
      >
        {(innerProps) => children(innerProps)}
      </OverlayTrigger>
    );
  }
}
