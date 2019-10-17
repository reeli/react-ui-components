import React, { useRef } from "react";
import { Portal } from "app-components/portal";
import { Placement } from "app-components/core/getPlacement";
import { usePosition } from "app-components/core/usePosition";
import { useToggle } from "app-components/core/useToggle";

interface IOverlayTriggerProps {
  content: JSX.Element;
  placement: Placement;
}

export const OverlayTrigger: React.FC<IOverlayTriggerProps> = ({ content, children, placement = Placement.bottom }) => {
  const triggerEl = useRef<HTMLElement>(null);
  const contentEl = useRef<HTMLDivElement>(null);
  const position = usePosition(triggerEl, contentEl, placement);
  const [, show] = useToggle();

  return (
    <>
      {React.cloneElement(React.Children.only(children), {
        ref: triggerEl,
        onClick: show,
      })}
      <Portal>
        <div
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
          }}
          ref={contentEl}
        >
          {content}
        </div>
      </Portal>
    </>
  );
};
