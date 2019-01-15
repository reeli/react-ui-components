import { RefObject, useLayoutEffect, useMemo, useState } from "react";

export const useClientRect = (ele: RefObject<HTMLElement | null>) => {
  const [clientRect, setClientRect] = useState<ClientRect | null>(null);

  // 更新元素的 ClientRect，使用 useMemo 确保只创建一次 updateClientRect 方法
  const updateClientRect = useMemo(() => {
    return () => {
      setClientRect(ele.current!.getBoundingClientRect());
    };
  }, []);

  // 只有当 React 组件 didMount 时，才能取到元素的 ClientRect，所以这里要使用 useLayoutEffect
  useLayoutEffect(() => {
    if (ele.current) {
      updateClientRect();
    }
  }, []);

  return [clientRect, updateClientRect] as [typeof clientRect, typeof updateClientRect];
};
