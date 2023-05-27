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
        sx={{ containerStyle: "primaryContainer", textStyle: "bodyLarge", px: 10 }}
        onClick={others.onClick}
        ref={ref}
      >
        {children}
      </Box>
    );
  },
);
