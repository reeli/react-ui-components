import { useMemo, useState } from "react";

// 外部可以通过 defaultVisible 给 visible 状态设置初始值
export const useToggle = (defaultVisible: boolean = false) => {
  const [visible, setVisible] = useState(defaultVisible);

  // 使用 useMemo 是为了确保只创建一次 show() 和 hide() 方法。否则，每一次组件 re-render 时都会创建。
  const { show, hide } = useMemo(() => {
    return {
      show: () => setVisible(true),
      hide: () => setVisible(false),
    };
  }, []);

  return [visible, show, hide] as [typeof visible, typeof show, typeof hide];
};
