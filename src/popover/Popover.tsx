import React, { useRef } from "react";
import { IOverlayTriggerProps } from "src/core/components/OverlayTrigger";
import { usePortal } from "src/portal/usePortal";
import { Position } from "src/core/components/Position";
import { ClickAwayListener } from "src/core/components/ClickAwayListener";

interface IPopoverProps extends IOverlayTriggerProps {
  defaultVisible?: boolean;
}

export const Popover: React.FC<IPopoverProps> = ({ content, children, placement, defaultVisible = false }) => {
  const triggerEl = useRef<HTMLElement>(null);
  const [renderPortal, show, hide] = usePortal(defaultVisible);

  return (
    <>
      {renderPortal(
        <Position triggerRef={triggerEl} placement={placement}>
          <ClickAwayListener onClickAway={hide}>
            <div>{content}</div>
          </ClickAwayListener>
        </Position>,
      )}
      {React.cloneElement(children, { ref: triggerEl, onClick: show })}
    </>
  );
};
