import React, { ReactNode, useEffect, useRef } from "react";
import { Placement, useToggle,Position } from "../core";
import { Portal } from "../portal";
import invariant from "invariant";

interface ITooltipsProps {
  content?: ReactNode;
  placement?: Placement;
  children: React.ReactElement;
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
