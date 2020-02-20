import React, { ReactNode, useRef } from "react";
import { Placement } from "src/core/utils/getPlacement";
import { useToggle } from "src/core/hooks/useToggle";
import { Portal } from "src/portal";
import { Position } from "src/core/components/Position";

interface IOverlayTriggerProps {
  placement?: Placement;
  trigger: (props: any) => ReactNode;
  content: (props: any) => ReactNode;
}

export const Overlay = ({ trigger, content, placement = Placement.bottomLeft }: IOverlayTriggerProps) => {
  const triggerEl = useRef(null);
  const [isOpen, open, close] = useToggle();

  return (
    <>
      {trigger({ open, close, triggerEl })}
      {isOpen ? (
        <Portal
          children={
            <Position triggerRef={triggerEl} placement={placement}>
              {content({ open, close })}
            </Position>
          }
        />
      ) : null}
    </>
  );
};
