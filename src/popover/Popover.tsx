import React, { useRef } from "react";
import { IOverlayTriggerProps } from "src/core/components/OverlayTrigger";
import { css } from "@emotion/core";
import { usePortal } from "src/portal/usePortal";
import { Position } from "src/core/components/Position";
import { ClickAwayListener } from "src/core/components/ClickAwayListener";

interface IPopoverProps extends IOverlayTriggerProps {
  defaultVisible?: boolean;
}

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

export const Popover: React.FC<IPopoverProps> = ({ content, children, placement, defaultVisible = false }) => {
  const triggerEl = useRef<HTMLElement>(null);
  const [renderPortal, show, hide] = usePortal(defaultVisible);

  return (
    <>
      {renderPortal(
        <Position triggerRef={triggerEl} placement={placement}>
          <ClickAwayListener onClickAway={hide}>
            <div css={popoverStyles}>
              <div css={arrowUp} />
              <div css={popoverInnerStyles}>{content}</div>
            </div>
          </ClickAwayListener>
        </Position>,
      )}
      {React.cloneElement(children, { ref: triggerEl, onClick: show })}
    </>
  );
};
