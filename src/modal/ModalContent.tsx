import { css } from "@emotion/react";
import { HTMLAttributes, FC } from "react";

const containerStyles = css({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  zIndex: 1000,
  // top: "3.75rem",
});

const modalContentStyles = css({
  background: "#fff",
  width: "100%",
});

interface IModalContentProps extends HTMLAttributes<any> {
  size?: string;
}

export const ModalContent: FC<IModalContentProps> = ({ children, size, ...otherProps }) => (
  <div css={containerStyles} {...otherProps}>
    <div css={[modalContentStyles, { maxWidth: size || "100%" }]}>{children}</div>
  </div>
);
