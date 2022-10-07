import { Portal } from "@ui/base";
import { css } from "@emotion/react";
import { FC, PropsWithChildren } from "react";

const modalStyles = css({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
});

export const Modal: FC<PropsWithChildren> = ({ children }) => (
  <Portal>
    <div css={modalStyles}>{children}</div>
  </Portal>
);
