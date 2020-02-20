import React from "react";
import { ReactNode, useEffect, useRef } from "react";
import { Placement, useToggle } from "../core";
import { Portal } from "../portal";
import { Position } from "src/core/components/Overlay";
import invariant from "invariant";

interface ITooltipsProps {
  content?: ReactNode;
  placement?: Placement;
}

export const Tooltip: React.FC<ITooltipsProps> = ({ content, placement, children }) => {
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
};
