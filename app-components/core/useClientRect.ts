import { RefObject, useCallback, useLayoutEffect, useState } from "react";

export const useClientRect = (ele: RefObject<HTMLElement | null>, deps: any[] = []) => {
  const [clientRect, setClientRect] = useState<ClientRect | null>(null);

  // 更新元素的 ClientRect，使用 useMemo 确保只创建一次 updateClientRect 方法
  const updateClientRect = useCallback(() => {
    if (ele.current) {
      setClientRect(ele.current!.getBoundingClientRect());
    }
  }, []);

  // 当可以访问 element dom 时，需要立即更新 client rect，否则会出现位置的延迟
  useLayoutEffect(() => {
    // 需要通过 deps 来更新 rect。因为 dom element 动态创建时，给 ref.current 重新赋值，但不会 trigger re-render

    updateClientRect();
  }, deps);

  return [clientRect, updateClientRect] as [typeof clientRect, typeof updateClientRect];
};
