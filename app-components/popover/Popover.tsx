import * as React from "react";
import { ReactElement, ReactNode, useEffect, useRef } from "react";
import { useToggle } from "../portal/useToggle";
import invariant from "invariant";
import { BasicPortal } from "../portal/BasicPortal";
import { Placement } from "../core/usePlacement";
import { useOutSideClick } from "../portal/useOutSideClick";
import { usePosition } from "./usePosition";

interface IPopoverProps {
  children: ReactElement<any>;
  content?: ReactNode;
  placement?: Placement;
}

export function Popover(props: IPopoverProps) {
  const { content, children, placement } = props;
  const [isOpen, show, hide] = useToggle();

  const triggerEl = useRef<HTMLElement>(null);
  const contentEl = useRef<HTMLDivElement>(null);
  const position = usePosition(triggerEl, contentEl, placement, [isOpen]);

  // ?
  useOutSideClick(triggerEl, hide);
  useOutSideClick(contentEl, hide);

  useEffect(() => {
    invariant(
      triggerEl.current instanceof HTMLElement,
      "The children must be able to receive ref prop of HTMLElement.",
    );
  }, []);

  return (
    <>
      {React.cloneElement(React.Children.only(children), {
        ref: triggerEl,
        onClick: show,
      })}
      {isOpen && (
        <BasicPortal>
          <div
            style={{
              position: "absolute",
              left: position.left,
              top: position.top,
              willChange: "transform",
            }}
            ref={contentEl}
          >
            {content}
          </div>
        </BasicPortal>
      )}
    </>
  );
}
