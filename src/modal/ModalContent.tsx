import React from "react";
import { css } from "@emotion/core";

const modalContentStyles = css({
  background: "#fff",
  padding: 25,
  borderRadius: 4,
  position: "absolute",
  zIndex: 1000,
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%,-50%,0)",
});

export const ModalContent: React.FC = ({ children }) => <div css={modalContentStyles}>{children}</div>;
