import { forwardRef, Ref, MouseEventHandler, ReactNode } from "react";
import { Box, $ } from "@ui/base";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
          ...$.of().hover().css({
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3),0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
          }),
          ...$.of().focus().css({
            color: "red",
          }),
          _disabled: {
            containerStyle: "surfaceContainer",
            cursor: "not-allowed",
          },
          ...$.of()
            .lastOfType()
            .childCombinator()
            .attr("data-placement=end")
            .css(
              {
                background: "blue",
              },
              {
                before: {
                  content: "'.'",
                  background: "red",
                },
              },
            ),
        }}
        onClick={others.onClick}
        ref={ref}
        {...others}
      >
        {children}
      </Box>
    );
  },
);
