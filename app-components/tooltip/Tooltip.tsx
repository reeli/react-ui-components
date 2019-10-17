import * as React from "react";
import { ReactElement, ReactNode, useEffect, useRef } from "react";
import { useToggle } from "../core/useToggle";
import { Portal } from "../portal/Portal";
import { Position } from "../core/Overlay";
import { Placement } from "../core/getPlacement";
import invariant from "invariant";

interface ITooltipsProps {
  children: ReactElement<any>;
  content?: ReactNode;
  placement?: Placement;
}

export function Tooltip(props: ITooltipsProps) {
  const { content, children, placement } = props;
  const [isOpen, show, hide] = useToggle();
  const triggerEl = useRef<HTMLElement>(null);

  useEffect(() => {
    invariant(
      triggerEl.current instanceof HTMLElement,
      "The children must be able to receive ref prop of HTMLElement.",
    );
  }, []);

  return (
    <>
      {React.cloneElement(React.Children.only(children), {
        ref: triggerEl,
        onMouseEnter: show,
        onMouseLeave: hide,
      })}
      {isOpen && (
        <Portal>
          <Position triggerRef={triggerEl} placement={placement}>
            {content}
          </Position>
        </Portal>
      )}
    </>
  );
}
