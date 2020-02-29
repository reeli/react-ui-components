import React, { useEffect, useRef } from "react";
import { IOverlayTriggerProps } from "src/core/components/OverlayTrigger";
import { Position } from "src/core/components/Position";
import { ClickAwayListener } from "src/core/components/ClickAwayListener";
import invariant from "invariant";
import { useToggle } from "src/core";
import { Portal } from "src/portal";

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
