import React, { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import invariant from "invariant";
import { Portal, Position, Placement, useToggle } from "@ui/base";

export const useTooltip = () => {
  const triggerEl = useRef<HTMLElement>(null);
  const [visible, show, hide] = useToggle();

  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  useEffect(() => {
    invariant(
      triggerEl.current instanceof HTMLElement,
      "The children must be able to receive ref prop of HTMLElement."
    );
  }, []);

  const TooltipContent = useMemo(() => {
    return ({ children, placement }: PropsWithChildren<{ placement?: Placement }>) => {
      return (
        <Portal>
          <Position triggerRef={triggerEl} placement={placement}>
            {children}
          </Position>
        </Portal>
      );
    };
  }, []);

  const TooltipTrigger = useMemo(() => {
    return ({ children }: { children: React.ReactElement }) => {
      return React.cloneElement(React.Children.only(children), {
        ref: triggerEl,
        onMouseEnter: () => {
          console.log("enter");
          show();
        },
        onMouseLeave: hide,
        onMouseOver: () => {
          if (visibleRef.current) {
            return;
          }
          console.log("hover");
          show();
        }
      });
    };
  }, []);

  return [TooltipTrigger, TooltipContent, show, hide, visible] as const;
};
