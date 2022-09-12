import React, { ReactElement, ReactNode, useEffect, useRef } from "react";
import invariant from "invariant";
import { Portal,Placement, Position } from "../";

export interface IOverlayTriggerProps {
  children: ReactElement<any>; // 不能是 undefined、boolean、null 或者 text，只能是一个 react element（不一定有 DOM，所以要用 invariant 来控制），但是可以把 ref 绑上去
  content?: ReactNode;
  placement?: Placement;
  visible?: boolean;
}

export const OverlayTrigger: React.FC<IOverlayTriggerProps> = ({ content, children, placement, visible = false }) => {
  // TODO: visible 状态的控制，究竟是在内部还是在外部？

  const triggerEl = useRef<HTMLElement>(null);

  // 用 cloneElement(children) 有个问题，就是传进来的值必须是 HTMLElement，或者使用 forwardRef 的组件（将 ref forward 到一个 HTMLElement 上），否则在 getBondingClientRect 时就会出错
  useEffect(() => {
    invariant(
      triggerEl.current instanceof HTMLElement,
      "The children must be able to receive ref prop of HTMLElement.",
    );
  });

  // click out side 绑定到每一个 Popover，因为每一个 Popover 判断 outside 的对象不同。who's outside?
  // 只有当 visible = true 时，才绑定监听事件，否则什么也不做

  return (
    <>
      {React.cloneElement(React.Children.only(children), {
        ref: triggerEl,
      })}
      {visible && (
        <Portal>
          <Position triggerRef={triggerEl} placement={placement}>
            {content}
          </Position>
        </Portal>
      )}
    </>
  );
};
