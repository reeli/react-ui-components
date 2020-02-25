import React, { ReactNode, useMemo, useRef } from "react";
import { useToggle } from "src/core";
import { Portal } from "src/portal/Portal";

export const usePortal = (defaultVisible = false) => {
  const [visible, show, hide] = useToggle(defaultVisible);

  // const visibleRef = useRefValue(visible);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  // renderPortal 会在组件 render 时被调用
  const renderPortal = useMemo(
    () => (children: ReactNode) => {
      // 由于此时取值是 在 render 时，如果使用 useRefValue，那么这里取到的 visible 的值就始终是前一次的值（因为要等 render 完成之后才会给 visibleRef.current 赋值），而非最新的值。也就是说取值先于赋值。
      return visibleRef.current && <Portal>{children}</Portal>;
    },
    [],
  );

  return [renderPortal, show, hide, visible] as const;
};
