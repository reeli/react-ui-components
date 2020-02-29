import React from "react";
import { css } from "@emotion/core";

const containerStyles = css({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  zIndex: 1000,
  top: "100px",
});

const modalContentStyles = css({
  background: "#fff",
});

export const ModalContent: React.FC<React.HTMLAttributes<any>> = ({ children, ...otherProps }) => (
  <div css={containerStyles} {...otherProps}>
    <div css={modalContentStyles}>{children}</div>
  </div>
);
