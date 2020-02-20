import React, { ReactNode, RefObject, useRef } from "react";
import { getPlacement, Placement, useClientRect, useResize, useScroll } from "src/core";

interface IPositionProps {
  triggerRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  placement?: Placement;
}

export const Position = ({ triggerRef, placement = Placement.bottomRight, children }: IPositionProps) => {
  const contentEl = useRef<HTMLDivElement>(null);
  const [triggerRect, updateTriggerRect] = useClientRect(triggerRef);
  const [contentRect] = useClientRect(contentEl);

  // 给 trigger 元素和它的滚动父节点绑定 scroll 事件，更新它的 ClientRect
  useScroll(triggerRef, updateTriggerRect);
  // 监听 resize 事件，并更新 trigger 元素的 ClientRect
  useResize(updateTriggerRect);

  // 根据触发元素和内容元素的 ClientRect，以及摆放位置，计算出内容元素的坐标
  const position = getPlacement({ triggerRect, contentRect, placement });

  return (
    <div
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        willChange: "transform",
      }}
      ref={contentEl}
    >
      {children}
    </div>
  );
};
