import * as React from "react";
import { ReactNode, RefObject, useRef } from "react";
import { useDOMRect } from "./useDOMRect";
import { NPortal } from "../portal/NPortal";
import { Placement, usePlacement } from "./usePlacement";
import { useToggle } from "../portal/useToggle";

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
      <NPortal
        children={
          <Position triggerRef={triggerEl} placement={placement}>
            {content({ open, close })}
          </Position>
        }
        isOpen={isOpen}
      />
    </>
  );
};

export const Position = ({
  triggerRef,
  placement = Placement.bottomRight,
  children,
}: {
  triggerRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  placement?: Placement;
}) => {
  const contentEl = useRef(null);
  const triggerRect = useDOMRect(triggerRef);
  const contentRect = useDOMRect(contentEl);

  const position = usePlacement({
    triggerRect,
    contentRect,
    placement,
  });

  return (
    <div style={{ position: "absolute", top: position.top, left: position.left }} ref={contentEl}>
      {children}
    </div>
  );
};
