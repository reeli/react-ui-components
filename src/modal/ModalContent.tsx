import React from "react";
import { css } from "@emotion/react";

const containerStyles = css({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  zIndex: 1000,
  top: "3.75rem",
});

const modalContentStyles = css({
  background: "#fff",
  width: "100%",
});

interface IModalContentProps extends React.HTMLAttributes<any> {
  size?: string;
}

export const ModalContent: React.FC<IModalContentProps> = ({ children, size = "38rem", ...otherProps }) => (
  <div css={containerStyles} {...otherProps}>
    <div css={[modalContentStyles, { maxWidth: size }]}>{children}</div>
  </div>
);
