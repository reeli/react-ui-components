import React from "react";
import { Portal } from "src/portal";
import { css } from "@emotion/core";

const modalStyles = css({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
});

interface IModalProps {
  visible: boolean;
}

export const Modal: React.FC<IModalProps> = ({ children, visible }) => {
  return visible ? (
    <Portal>
      <div css={modalStyles}>{children}</div>
    </Portal>
  ) : null;
};
