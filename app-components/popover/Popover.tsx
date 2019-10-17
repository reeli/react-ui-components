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
  closeOnClickOutSide?: boolean;
}

export function Popover(props: IPopoverProps) {
  const { content, children, placement, closeOnClickOutSide = true } = props;
  const [isOpen, show, hide] = useToggle();

  const triggerEl = useRef<HTMLElement>(null);
  const contentEl = useRef<HTMLDivElement>(null);
  const position = usePosition(triggerEl, contentEl, placement, [isOpen]);

  // click out side 绑定到每一个 Popover，因为每一个 Popover 判断 outside 的对象不同。who's outside?
  // 只有当 isOpen = true 时，才绑定监听事件，否则什么也不做
  useOutSideClick([triggerEl, contentEl], hide, closeOnClickOutSide && isOpen);

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
