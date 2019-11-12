import { RefObject, useEffect } from "react";

export const createUseElementResize = () => {
  if ((window as any).ResizeObserver) {
    // https://developers.google.com/web/updates/2016/10/resizeobserver

    return (ref: RefObject<Element | null>, cb: () => void) => {
      useEffect(() => {
        if (!ref.current) {
          return;
        }

        const ro = new (window as any).ResizeObserver((entries: any) => {
          for (const entry of entries) {
            if (entry.target === ref.current) {
              cb();
            }
          }
        });

        ro.observe(ref.current);

        return () => {
          ro.disconnect();
        };
      });
    };
  }

  return (ref: RefObject<Element | null>, cb: () => void) => {
    useEffect(() => {
      if (ref.current) {
        cb();
      }
    });
  };
};
