import React, { MouseEventHandler } from "react";
import { css } from "@emotion/core";

interface IModalOverlayProps {
  onClick?: MouseEventHandler;
}

const transparentModalOverlayStyles = css({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
});

export const TransparentModalOverlay = ({ onClick }: IModalOverlayProps) => (
  <div onClick={onClick} css={transparentModalOverlayStyles} />
);
