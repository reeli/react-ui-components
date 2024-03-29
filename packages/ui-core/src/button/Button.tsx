import { forwardRef, PropsWithChildren, ButtonHTMLAttributes } from "react";
import { Box, AllCSSProperties } from "@ui/base";

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  sx?: AllCSSProperties;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, sx = {}, ...others }, ref) => {
  return (
    <Box
      component={"button"}
      sx={[
        {
          containerStyle: "primary",
          textStyle: "bodyLarge",
          px: 16,
          py: 8,
          rounded: 24,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          "&:hover": {
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3),0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
          },
          "&:focus": {
            color: "error",
          },
          "&[data-disabled]": {
            containerStyle: "surfaceContainer",
            cursor: "not-allowed",
            boxShadow: "none",
          },
        },
        sx,
      ]}
      ref={ref}
      {...others}
    >
      {children}
    </Box>
  );
});
