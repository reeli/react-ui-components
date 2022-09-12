import React, { useEffect, useRef } from "react";
import { useToggle,ClickAwayListener,Position,IOverlayTriggerProps } from "@ui/base";
import invariant from "invariant";
import { Portal } from "@ui/base";

interface IPopoverProps extends IOverlayTriggerProps {
  defaultVisible?: boolean;
}

export const Popover: React.FC<IPopoverProps> = ({ content, children, placement, defaultVisible = false }) => {
  const triggerEl = useRef<HTMLElement>(null);
  const [isOpen, show, hide] = useToggle(defaultVisible);

  useEffect(() => {
    invariant(
      triggerEl.current instanceof HTMLElement,
      "The children must be able to receive ref prop of HTMLElement.",
    );
  }, []);

  return (
    <>
      {isOpen && (
        <Portal>
          <Position triggerRef={triggerEl} placement={placement}>
            <ClickAwayListener onClickAway={hide}>
              <div>{content}</div>
            </ClickAwayListener>
          </Position>
        </Portal>
      )}
      {React.cloneElement(children, { ref: triggerEl, onClick: show })}
    </>
  );
};
