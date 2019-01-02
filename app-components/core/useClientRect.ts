import { RefObject, useLayoutEffect, useState } from "react";

export const useClientRect = (
  ele: RefObject<HTMLElement | null>,
  inputs: ReadonlyArray<any> = [],
): ClientRect | null => {
  const [domRect, updateDOMRect] = useState<ClientRect | null>(null);

  useLayoutEffect(() => {
    const getRect = () => {
      if (ele.current) {
        updateDOMRect(ele.current!.getBoundingClientRect());
      }
    };

    getRect();

    document.body.addEventListener("wheel", getRect);
    window.addEventListener("resize", getRect);

    return function cleanup() {
      document.body.removeEventListener("wheel", getRect);
      window.removeEventListener("resize", getRect);
    };
  }, inputs);

  return domRect;
};
