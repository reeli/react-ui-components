import { RefObject, useLayoutEffect } from "react";
import { getScrollParents } from "./getScrollParent";

// Why pass ref object instead of HTMLElement?
export const useScroll = (ele: RefObject<HTMLElement | null>, onScroll: (evt: Event) => void) => {
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
  }, []);
};
