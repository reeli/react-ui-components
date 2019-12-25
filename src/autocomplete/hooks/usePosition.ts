import { RefObject } from "react";
import { getPlacement, Placement } from "../utils/getPlacement";
import { useClientRect } from "./useClientRect";
import { useScroll } from "./useScroll";
import { useResize } from "./useResize";

export const usePosition = (
  triggerEl: RefObject<HTMLElement | null>,
  contentEl: RefObject<HTMLElement | null>,
  placement = Placement.bottomLeft,
  deps: any[] = [],
) => {
  const [triggerRect, updateTriggerRect] = useClientRect(triggerEl, deps);
  const [contentRect] = useClientRect(contentEl, deps);

  useScroll(triggerEl, updateTriggerRect);

  useResize(updateTriggerRect);

  return getPlacement({ triggerRect, contentRect, placement });
};
