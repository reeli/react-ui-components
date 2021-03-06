import React, { useEffect, useMemo, useRef } from "react";
import { Position } from "src/core/components/Position";
import { Placement, useToggle } from "src/core";
import { ClickAwayListener } from "src/core/components/ClickAwayListener";
import invariant from "invariant";
import { Portal } from "src/portal";

export const usePopover = (defaultVisible = false) => {
  const triggerEl = useRef<HTMLElement>(null);
  const [visible, show, hide] = useToggle(defaultVisible);

  useEffect(() => {
    invariant(
      triggerEl.current instanceof HTMLElement,
      "The children must be able to receive ref prop of HTMLElement.",
    );
  }, []);

  const renderPopoverContent = useMemo(() => {
    return (content: React.ReactNode, placement: Placement = Placement.bottomLeft) => {
      return (
        <Portal>
          <Position triggerRef={triggerEl} placement={placement}>
            <ClickAwayListener onClickAway={hide}>
              <div>{content}</div>
            </ClickAwayListener>
          </Position>
        </Portal>
      );
    };
  }, []);

  const renderPopoverTrigger = useMemo(() => {
    return (content: React.ReactElement) => {
      return React.cloneElement(content, { ref: triggerEl });
    };
  }, []);

  return [renderPopoverContent, renderPopoverTrigger, show, hide, visible] as const;
};
