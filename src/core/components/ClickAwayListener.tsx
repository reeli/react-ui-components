import React, { ReactElement, useContext, useEffect, useRef } from "react";
import { PortalContext } from "src/portal/PortalContext";
import invariant from "invariant";

interface IClickAwayListenerProps {
  children: ReactElement<any>;
  onClickAway: (evt: Event) => void;
}

export const ClickAwayListener: React.FC<IClickAwayListenerProps> = ({ children, onClickAway }) => {
  const { container } = useContext(PortalContext);
  const childrenEl = useRef<HTMLDivElement>(null);

  // 用 cloneElement(children) 有个问题，就是传进来的值必须是 HTMLElement，或者使用 forwardRef 的组件（将 ref forward 到一个 HTMLElement 上），否则在 getBondingClientRect 时就会出错
  useEffect(() => {
    invariant(
      childrenEl.current instanceof HTMLElement,
      "The children must be able to receive ref prop of HTMLElement.",
    );
  });

  useEffect(() => {
    const handleOutSideClick = (evt: Event) => {
      const node = childrenEl.current!;
      if ((node && node.contains(evt.target as HTMLElement)) || container.contains(evt.target as HTMLElement)) {
        return;
      }

      onClickAway(evt);
    };

    document.body.addEventListener("click", handleOutSideClick);

    return function cleanup() {
      document.body.removeEventListener("click", handleOutSideClick);
    };
  }, []);

  return React.cloneElement(React.Children.only(children), {
    ref: childrenEl,
  });
};
