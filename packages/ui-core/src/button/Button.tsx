import { forwardRef, Ref, PropsWithChildren } from "react";
import { Box } from "@ui/base";

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren>(
  ({ children, ...others }, ref: Ref<HTMLButtonElement>) => {
    return (
      <Box
        component={"button"}
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
          "&:hover": {
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3),0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
          },
          "&:focus": {
            color: "red",
          },
          "&[data-disabled]": {
            containerStyle: "surfaceContainer",
            cursor: "not-allowed",
            boxShadow: "none",
          },
        }}
        ref={ref}
        {...others}
      >
        {children}
      </Box>
    );
  },
);
