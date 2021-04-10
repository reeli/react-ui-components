import React, { MouseEventHandler } from "react";
import { css } from "@emotion/react";

interface IModalOverlayProps {
  onClick?: MouseEventHandler;
}

const modalOverlayStyles = css({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  background: "rgba(0,0,0,0.35)",
});

export const ModalOverlay = ({ onClick, ...otherProps }: IModalOverlayProps & React.HTMLAttributes<any>) => (
  <div onClick={onClick} css={modalOverlayStyles} {...otherProps} />
);
