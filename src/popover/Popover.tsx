import React from "react";
import { IOverlayTriggerProps, OverlayTrigger } from "src/core/OverlayTrigger";
import { css } from "@emotion/core";

interface IPopoverProps extends IOverlayTriggerProps {}

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

export const Popover: React.FC<IPopoverProps> = ({
  content,
  children,
  placement,
  closeOnClickOutSide = true,
  visible = false,
}) => {
  return (
    <OverlayTrigger
      content={
        <div css={popoverStyles}>
          <div css={arrowUp} />
          <div css={popoverInnerStyles}>{content}</div>
        </div>
      }
      placement={placement}
      closeOnClickOutSide={closeOnClickOutSide}
      visible={visible}
    >
      {children}
    </OverlayTrigger>
  );
};
