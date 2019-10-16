import { RefObject } from "react";
import { Placement, usePlacement } from "../core/usePlacement";
import { useClientRect } from "../core/useClientRect";
import { useScroll } from "../core/useScroll";
import { useResize } from "../core/useResize";

export const usePosition = (
  triggerEl: RefObject<HTMLElement | null>,
  contentEl: RefObject<HTMLElement | null>,
  placement = Placement.bottomRight,
  deps: any[] = [],
) => {
  const [triggerRect, updateTriggerRect] = useClientRect(triggerEl, deps);
  const [contentRect] = useClientRect(contentEl, deps);

  // 给 trigger 元素和它的滚动父节点绑定 scroll 事件，更新它的 ClientRect
  useScroll(triggerEl, updateTriggerRect);

  // 监听 resize 事件，并更新 trigger 元素的 ClientRect
  useResize(updateTriggerRect);

  // 根据触发元素和内容元素的 ClientRect，以及摆放位置，计算出内容元素的坐标

  return usePlacement({ triggerRect, contentRect, placement });
};
