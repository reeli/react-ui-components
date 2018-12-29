import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface IBasicPortalProps {
  children: ReactNode;
}

export const BasicPortal = (props: IBasicPortalProps) => {
  let container: HTMLDivElement | null = null;

  if (!container) {
    container = document.createElement("div");
    document.body.appendChild(container);
  }

  // Equal as componentWillUnmount
  useEffect(() => {
    return function cleanup() {
      if (container) {
        document.body.removeChild(container);
      }
    };
  });

  return createPortal(props.children, container);
};
