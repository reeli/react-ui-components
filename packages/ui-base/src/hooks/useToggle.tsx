import { useMemo, useState } from "react";

// 外部可以通过 defaultVisible 给 visible 状态设置初始值
export const useToggle = (defaultVisible: boolean = false) => {
  const [visible, setVisible] = useState(defaultVisible);

  // 使用 useMemo 是为了确保只创建一次 show 和 hide 方法。否则，每一次组件 re-render 时都会重新创建。
  const { show, hide, toggle } = useMemo(() => {
    return {
      show: () => setVisible(true),
      hide: () => setVisible(false),
      toggle: () => setVisible(v => !v),
    };
  }, []);

  return [visible, show, hide, toggle, setVisible] as const;
};
