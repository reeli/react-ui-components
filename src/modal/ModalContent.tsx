import React from "react";
import { css } from "@emotion/core";

const modalContentStyles = css({
  background: "#fff",
  padding: 25,
  borderRadius: 4,
  position: "absolute",
  zIndex: 1000,
});

export const ModalContent: React.FC<React.HTMLAttributes<any>> = ({ children, ...otherProps }) => (
  <div css={modalContentStyles} {...otherProps}>
    {children}
  </div>
);
