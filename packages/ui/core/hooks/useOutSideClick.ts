import { RefObject, useLayoutEffect } from "react";

export const useOutSideClick = (
  elements: RefObject<HTMLElement | null>[],
  onOutSideClick: (evt: Event) => void,
  active: boolean = true,
) =>
  useLayoutEffect(() => {
    if (!active) {
      return;
    }

    const handleOutSideClick = (evt: Event) => {
      const shouldIgnore = elements.some(ele => {
        const node = ele.current!;
        return node && node.contains(evt.target as HTMLElement);
      });

      if (!shouldIgnore) {
        onOutSideClick(evt);
      }
    };

    document.body.addEventListener("click", handleOutSideClick);

    return function cleanup() {
      document.body.removeEventListener("click", handleOutSideClick);
    };
  }, [active]);
