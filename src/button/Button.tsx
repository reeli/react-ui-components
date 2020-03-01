import React, { forwardRef, HTMLAttributes, Ref } from "react";
import { css } from "@emotion/core";

const buttonStyles = css({
  backgroundColor: "#fff",
  padding: 10,
  borderRadius: 4,
  border: "1px solid #ccc",
  fontSize: 14,
  outline: "none",
  cursor: "pointer",
});

interface IButtonProps extends HTMLAttributes<any> {
  disabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, disabled, ...others }, ref: Ref<HTMLButtonElement>) => {
    return (
      <button ref={ref} css={buttonStyles} disabled={disabled} {...others}>
        {children}
      </button>
    );
  },
);
