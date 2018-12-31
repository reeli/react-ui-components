import { RefObject, useLayoutEffect } from "react";

export const useOutSideClick = (ele: RefObject<HTMLElement | null>, onOutSideClick: () => void) => {
  useLayoutEffect(() => {
    const handleOutSideClick = (evt: Event) => {
      const node = ele.current!;
      if (node && !node.contains(evt.target as HTMLElement)) {
        onOutSideClick();
      }
    };

    document.body.addEventListener("click", handleOutSideClick);

    return function cleanup() {
      document.body.removeEventListener("click", handleOutSideClick);
    };
  }, []);
};
