import { Portal } from "../portal";
import { css } from "@emotion/react";

const modalStyles = css({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
});

export const Modal: React.FC = ({ children }) => (
  <Portal>
    <div css={modalStyles}>{children}</div>
  </Portal>
);
