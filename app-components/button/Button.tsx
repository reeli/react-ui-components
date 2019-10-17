import React, { forwardRef, ReactNode, Ref } from "react";
import { css } from "glamor";

const buttonStyles = css({
  backgroundColor: "#fff",
  padding: 10,
  borderRadius: 4,
  border: "1px solid #ccc",
  fontSize: 14,
  outline: "none",
});

export const Button = forwardRef(
  ({ children, ...others }: { children: ReactNode; onClick?: () => void }, ref: Ref<HTMLButtonElement>) => {
    return (
      <button ref={ref} {...buttonStyles} {...others}>
        {children}
      </button>
    );
  },
);
