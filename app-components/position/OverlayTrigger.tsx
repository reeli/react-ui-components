import * as React from 'react';
import {
  IPortalProps,
  Portal,
} from '../portal/Portal';
import { Position } from './Position';

export enum Placement {
  left,
  right,
  top,
  bottom
}

interface IOverlayTriggerProps extends IPortalProps {
  placement?: Placement
}

export class OverlayTrigger extends React.Component<IOverlayTriggerProps, any> {
  triggerPosition: ClientRect | null = null;

  render() {
    const { content, children, placement = 'bottom', ...others } = this.props;
    return (
      <Portal
        content={(innerProps) => <Position>
          {(contentPosition) => {
            let nextPosition: any = {};
            if (contentPosition && this.triggerPosition) {
              const left = (this.triggerPosition.width - contentPosition.width) / 2 + this.triggerPosition.left;
              const top = (this.triggerPosition.height - contentPosition.height) / 2 + this.triggerPosition.top;
              switch (placement) {
                case Placement.bottom:
                  nextPosition.top = this.triggerPosition.top + this.triggerPosition.height;
                  nextPosition.left = left;
                  break;
                case Placement.top:
                  nextPosition.top = this.triggerPosition.top - contentPosition.height;
                  nextPosition.left = left;
                  break;
                case Placement.left:
                  nextPosition.left = this.triggerPosition.left - contentPosition.width;
                  nextPosition.top = top;
                  break;
                case Placement.right:
                  nextPosition.left = this.triggerPosition.left + this.triggerPosition.width;
                  nextPosition.top = top;
              }
            }
            return (
              <span style={{ position: 'absolute', top: nextPosition.top, left: nextPosition.left }}>
                {content(innerProps)}
              </span>
            );
          }}
        </Position>}
        {...others}
      >
        {(innerProps) => <Position>
          {(triggerPosition) => {
            this.triggerPosition = triggerPosition;
            return children(innerProps);
          }}
        </Position>}
      </Portal>
    );
  }
}