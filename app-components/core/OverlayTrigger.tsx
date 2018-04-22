import * as React from 'react';
import { IPortalProps, Portal } from '../portal/Portal';
import { Position } from './Position';

export enum Placement {
  left,
  right,
  top,
  bottom,
  leftBottom,
}

interface IOverlayTriggerProps extends IPortalProps {
  placement?: Placement;
}

export class OverlayTrigger extends React.Component<IOverlayTriggerProps, any> {
  triggerPosition: ClientRect | null = null;
  contentPosition: ClientRect | null = null;

  getPositionByPlacement(placement: Placement) {
    let position: any = {
      left: 0,
      top: 0,
    };
    if (this.contentPosition && this.triggerPosition) {
      const left = (this.triggerPosition.width - this.contentPosition.width) / 2 + this.triggerPosition.left;
      const top = (this.triggerPosition.height - this.contentPosition.height) / 2 + this.triggerPosition.top;
      switch (placement) {
        case Placement.bottom:
          position.top = this.triggerPosition.top + this.triggerPosition.height;
          position.left = left;
          break;
        case Placement.top:
          position.top = this.triggerPosition.top - this.contentPosition.height;
          position.left = left;
          break;
        case Placement.left:
          position.left = this.triggerPosition.left - this.contentPosition.width;
          position.top = top;
          break;
        case Placement.right:
          position.left = this.triggerPosition.left + this.triggerPosition.width;
          position.top = top;
          break;
        case Placement.leftBottom:
          position.left = this.triggerPosition.left;
          position.top = this.triggerPosition.top + this.triggerPosition.height;
          break;
      }
    }
    return position;
  }

  render() {
    const { content, children, placement = Placement.bottom, ...others } = this.props;
    return (
      <Portal
        content={innerProps => (
          <Position>
            {contentPosition => {
              this.contentPosition = contentPosition;
              const position = this.getPositionByPlacement(placement);
              return (
                <div style={{ position: 'absolute', top: position.top, left: position.left }}>
                  {content(innerProps)}
                </div>
              );
            }}
          </Position>
        )}
        {...others}
      >
        {innerProps => (
          <Position>
            {triggerPosition => {
              this.triggerPosition = triggerPosition;
              return children(innerProps);
            }}
          </Position>
        )}
      </Portal>
    );
  }
}
