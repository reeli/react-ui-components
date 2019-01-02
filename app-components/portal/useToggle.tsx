import { useMemo, useState } from "react";

export const useToggle = (defaultState: boolean = false) => {
  const [isShow, setShowState] = useState(defaultState);

  /*
       `useMemo` here to ensure `open` and `close` only be created once.
        Otherwise, it would be create again every time when the Function component re-render.
        */

  const { show, hide } = useMemo(() => {
    const create = (state: boolean) => () => {
      setShowState(state);
    };
    return {
      show: create(true),
      hide: create(false),
    };
  }, []);

  return [isShow, show, hide] as [typeof isShow, typeof show, typeof hide];
};
