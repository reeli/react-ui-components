import { RefObject, useCallback, useLayoutEffect, useState } from "react";
import { isEqual } from "lodash";

const getBoundingClientRect = (ele: Element): ClientRect => {
  const domRect = ele.getBoundingClientRect() as DOMRect;
  const formatVal = (val: number) => Math.round(val) || 0;
  return {
    top: formatVal(domRect.top), // formatVal 是为了避免因为 number 的精读问题，导致 isEqual 不等
    left: formatVal(domRect.left),
    width: formatVal(domRect.width),
    height: formatVal(domRect.height),
  } as any;
};

export const useClientRect = (ele: RefObject<HTMLElement | null>, deps: any[] = []) => {
  const [clientRect, setClientRect] = useState<ClientRect | null>(null);

  // 更新元素的 ClientRect，使用 useMemo 确保只创建一次 updateClientRect 方法
  const updateClientRect = useCallback(() => {
    if (ele.current) {
      setClientRect(prev => {
        const next = getBoundingClientRect(ele.current!);
        return isEqual(prev, next) ? prev : next;
      });
    }
  }, []);

  // 当可以访问 element dom 时，需要立即更新 client rect，否则会出现位置的延迟
  useLayoutEffect(
    () => {
      // 需要通过 deps 来更新 rect。因为 dom element 动态创建时，给 ref.current 重新赋值，但不会 trigger re-render

      updateClientRect();
    },
    // 当 deps ([visible]) 发生变化时：
    // 1. 自动 updateReact。但是 update 时 A 已经完成挂载。所以 deps 无须加上 ele.current
    // 2. 创建并显示内容 A。
    [deps],
  );

  return [clientRect, updateClientRect] as [typeof clientRect, typeof updateClientRect];
};
