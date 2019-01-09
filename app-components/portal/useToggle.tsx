import { useMemo, useState } from "react";

export const useToggle = (defaultVisible: boolean = false) => {
  const [visible, setVisible] = useState(defaultVisible);

  /*
         `useMemo` here to ensure `open` and `close` only be created once.
          Otherwise, it would be create again every time when the Function component re-render.
          */

  const { show, hide } = useMemo(() => {
    return {
      show: () => setVisible(true),
      hide: () => setVisible(false),
    };
  }, []);

  return [visible, show, hide] as [typeof visible, typeof show, typeof hide];
};
