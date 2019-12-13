import { RefObject, useCallback, useLayoutEffect, useState } from "react";
import { isEqual } from "lodash";

const getBoundingClientRect = (ele: Element): ClientRect => {
  const domRect = ele.getBoundingClientRect() as DOMRect;
  const formatVal = (val: number) => Math.round(val) || 0;
  return {
    top: formatVal(domRect.top),
    left: formatVal(domRect.left),
    width: formatVal(domRect.width),
    height: formatVal(domRect.height),
  } as any;
};

export const useClientRect = (ele: RefObject<HTMLElement | null>, deps: any[] = []) => {
  const [clientRect, setClientRect] = useState<ClientRect | null>(null);

  const updateClientRect = useCallback(() => {
    if (ele.current) {
      setClientRect(prev => {
        const next = getBoundingClientRect(ele.current!);
        return isEqual(prev, next) ? prev : next;
      });
    }
  }, []);

  useLayoutEffect(
    () => {
      updateClientRect();
    },
    [ele.current, ...deps],
  );

  return [clientRect, updateClientRect] as [typeof clientRect, typeof updateClientRect];
};
