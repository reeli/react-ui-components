import * as React from "react";
import { ReactElement, ReactNode, useEffect, useRef } from "react";
import invariant from "invariant";
import { Portal } from "../portal";
import { Placement } from "../core/getPlacement";
import { useOutSideClick } from "../core/useOutSideClick";
import { usePosition } from "../core/usePosition";
import { isEqual } from "lodash";
import { useRefValue } from "../core/useRefValue";
import { useToggle } from "../core/useToggle";

interface IPopoverProps {
  children: ReactElement<any>;
  content?: ReactNode;
  placement?: Placement;
  closeOnClickOutSide?: boolean;
  visible?: boolean;
}

export function Popover(props: IPopoverProps) {
  const { content, children, placement, closeOnClickOutSide = true, visible = false } = props;
  const [isOpen, show, hide, setIsOpen] = useToggle();
  const isOpenRef = useRefValue(isOpen);

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

  useEffect(
    () => {
      if (!isEqual(visible, isOpenRef.current)) {
        setIsOpen(visible);
      }
    },
    [visible],
  );

  return (
    <>
      {React.cloneElement(React.Children.only(children), {
        ref: triggerEl,
        onClick: show,
      })}
      {isOpen && (
        <Portal>
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
        </Portal>
      )}
    </>
  );
}
