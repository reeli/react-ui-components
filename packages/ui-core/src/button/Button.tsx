import { forwardRef, Ref, MouseEventHandler, ReactNode } from "react";
import { Box } from "@ui/base";

interface ButtonProps {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, ...others }, ref: Ref<HTMLButtonElement>) => {
    return (
      <Box
        component={"button"}
        disabled={disabled}
        sx={{
          containerStyle: "primary",
          textStyle: "bodyLarge",
          px: 16,
          py: 8,
          rounded: 24,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          _hover: {
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3),0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
          },
          _focus: {
            color: "red",
          },
          _disabled: {
            containerStyle: "surfaceContainer",
            cursor: "not-allowed",
          },
        }}
        onClick={others.onClick}
        ref={ref}
      >
        {children}
      </Box>
    );
  },
);
