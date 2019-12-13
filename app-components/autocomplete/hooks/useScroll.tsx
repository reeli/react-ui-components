import { RefObject, useLayoutEffect } from "react";
import { getScrollParents } from "../utils/getScrollParent";

export const useScroll = (ele: RefObject<HTMLElement | null>, onScroll: (evt: Event) => void, deps: any[] = []) => {
  useLayoutEffect(() => {
    const handleScroll = (evt: Event) => {
      onScroll(evt);
    };

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
