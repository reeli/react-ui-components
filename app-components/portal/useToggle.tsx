import { useMemo, useState } from "react";

export const useToggle = (defaultOpen: boolean = false) => {
  const [openState, setOpenState] = useState(defaultOpen);

  /*
    `useMemo` here to ensure `open` and `close` only be created once.
     Otherwise, it would be create again every time when the Function component re-render.
     */

  const { open, close } = useMemo(() => {
    const create = (state: boolean) => () => {
      setOpenState(state);
    };
    return {
      open: create(true),
      close: create(false),
    };
  }, []);

  return [openState, open, close] as [typeof openState, typeof open, typeof close];
};
