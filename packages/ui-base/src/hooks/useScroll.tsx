import { RefObject, useLayoutEffect } from "react";
import { getScrollParents } from "../utils/getScrollParent";

// Why pass ref object instead of HTMLElement?
export const useScroll = (ele: RefObject<HTMLElement | null>, onScroll: (evt: Event) => void, deps: any[] = []) => {
  useLayoutEffect(() => {
    const handleScroll = (evt: Event) => {
      onScroll(evt);
    };

    // dom element 动态创建的场景
    if (ele.current) {
      const parentElements = getScrollParents(ele.current);

      parentElements.forEach(parentElement => {
        parentElement.addEventListener("scroll", handleScroll);
      });

      return function cleanup() {
        parentElements.forEach(parentElement => {
          parentElement.removeEventListener("scroll", handleScroll);
        });
      };
    }
  }, deps);
};
