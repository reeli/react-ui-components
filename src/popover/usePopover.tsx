import React, { useMemo, useRef } from "react";
import { usePortal } from "src/portal/usePortal";
import { css } from "@emotion/core";
import { Position } from "src/core/components/Position";
import { Placement } from "src/core";
import { ClickAwayListener } from "src/core/components/ClickAwayListener";

const popoverStyles = css({
  position: "absolute",
  zIndex: 1000,
  padding: "8px 0",
  minWidth: 300,
});

const popoverInnerStyles = css({
  backgroundColor: "#4a4a4a",
  color: "#fff",
  fontSize: "14px",
  padding: ".3rem",
});

const arrowUp = css({
  position: "absolute",
  top: 0,
  left: "10%",
  marginLeft: "-5px",
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderBottom: "8px solid #4a4a4a",
  width: 0,
  height: 0,
});

export const usePopover = (defaultVisible = false) => {
  const [renderPortal, show, hide, visible] = usePortal(defaultVisible);
  const triggerEl = useRef<HTMLElement>(null);

  const renderPopoverContent = useMemo(() => {
    return (content: React.ReactNode, placement: Placement = Placement.bottomLeft) =>
      renderPortal(
        <Position triggerRef={triggerEl} placement={placement}>
          <ClickAwayListener onClickAway={hide}>
            <div css={popoverStyles}>
              <div css={arrowUp} />
              <div css={popoverInnerStyles}>{content}</div>
            </div>
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
