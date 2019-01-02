import * as React from "react";
import { ReactElement, ReactNode, useRef } from "react";
import { useToggle } from "../portal/useToggle";
import { BasicPortal } from "../portal/BasicPortal";
import { Position } from "../core/Overlay";
import { Placement } from "../core/usePlacement";

interface ITooltipsProps {
  children: ReactElement<any>;
  width?: string;
  content?: ReactNode;
  placement?: Placement;
}

export function Tooltip(props: ITooltipsProps) {
  const { content, children, placement } = props;
  const [isOpen, show, hide] = useToggle();
  const triggerEl = useRef(null);

  return (
    <>
      {React.cloneElement(children, {
        ref: triggerEl,
        onMouseEnter: show,
        onMouseLeave: hide,
      })}
      {isOpen && (
        <BasicPortal>
          <Position triggerRef={triggerEl} placement={placement}>
            {content}
          </Position>
        </BasicPortal>
      )}
    </>
  );
}
