import React, { useMemo, useRef } from "react";
import { usePortal } from "src/portal/usePortal";
import { Position } from "src/core/components/Position";
import { Placement } from "src/core";
import { ClickAwayListener } from "src/core/components/ClickAwayListener";

export const usePopover = (defaultVisible = false) => {
  const [renderPortal, show, hide, visible] = usePortal(defaultVisible);
  const triggerEl = useRef<HTMLElement>(null);

  const renderPopoverContent = useMemo(() => {
    return (content: React.ReactNode, placement: Placement = Placement.bottomLeft) =>
      renderPortal(
        <Position triggerRef={triggerEl} placement={placement}>
          <ClickAwayListener onClickAway={hide}>
            <div>{content}</div>
          </ClickAwayListener>
        </Position>,
      );
  }, []);

  const renderPopoverTrigger = useMemo(() => {
    return (content: React.ReactElement) => {
      return React.cloneElement(content, { ref: triggerEl });
    };
  }, []);

  return [renderPopoverContent, renderPopoverTrigger, show, hide, visible] as const;
};
