import { useLayoutEffect } from "react";

export const useResize = (onResize: (evt: Event) => any) => {
  useLayoutEffect(() => {
    const handleResize = (evt: Event) => {
      onResize(evt);
    };

    window.addEventListener("resize", handleResize);
    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
};
