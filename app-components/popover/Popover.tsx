import { css } from 'glamor';
import * as React from 'react';
import { OverlayTrigger, Placement } from '../core/OverlayTrigger';
import { IPortalPropsInnerProps } from '../portal/Portal';

interface IPopoverProps {
  children: (props: IPortalPropsInnerProps) => React.ReactNode;
  width?: string;
  content?: string | JSX.Element | null;
  placement?: Placement;
  closeOnOutSide?: boolean;
}

const popoverStyles = css({
  position: 'absolute',
  zIndex: 1000,
  padding: '8px 0',
});

const popoverInnerStyles = css({
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

export class Popover extends React.Component<IPopoverProps, any> {
  render() {
    const { width, content, children, placement, closeOnOutSide } = this.props;
    return (
      <OverlayTrigger
        content={() => (
          <div {...css(popoverStyles, { width })}>
            <div {...arrowUp} />
            <div {...popoverInnerStyles}>{content}</div>
          </div>
        )}
        placement={placement}
        closeOnOutSide={closeOnOutSide}
      >
        {props => {
          return <>{children(props)}</>;
        }}
      </OverlayTrigger>
    );
  }
}
