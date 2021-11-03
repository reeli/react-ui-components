import { forwardRef, Ref, MouseEventHandler, ReactNode } from "react";
import { css } from "@emotion/react";

const buttonStyles = css({
  backgroundColor: "#fff",
  padding: 10,
  borderRadius: 4,
  border: "1px solid #ccc",
  fontSize: 14,
  outline: "none",
  cursor: "pointer",
});

interface ButtonProps {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, ...others }, ref: Ref<HTMLButtonElement>) => {
    return (
      <button ref={ref} css={buttonStyles} disabled={disabled} {...others} role={"button-root"}>
        <span role={"button-label"}>{children}</span>
      </button>
    );
  },
);
