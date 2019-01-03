import { RefObject, useLayoutEffect, useState } from "react";
import { getScrollParents } from "./getScrollParent";

export const useClientRect = (
  ele: RefObject<HTMLElement | null>,
  inputs: ReadonlyArray<any> = [],
  shouldBindEvent: boolean = true,
): ClientRect | null => {
  const [domRect, updateDOMRect] = useState<ClientRect | null>(null);

  useLayoutEffect(() => {
    const getRect = () => {
      if (ele.current) {
        updateDOMRect(ele.current!.getBoundingClientRect());
      }
    };

    let ticking = false;

    function scroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          getRect();
          ticking = false;
        });
      }
      ticking = true;
    }

    scroll();

    if (shouldBindEvent && ele.current) {
      const parentElements = getScrollParents(ele.current);
      parentElements.forEach(parentElement => {
        parentElement.addEventListener("scroll", scroll);
      });

      window.addEventListener("resize", scroll);

      return function cleanup() {
        parentElements.forEach(parentElement => {
          parentElement.removeEventListener("scroll", scroll);
        });
        window.removeEventListener("resize", scroll);
      };
    }
  }, inputs);

  return domRect;
};
