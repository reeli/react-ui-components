import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface IBasicPortalProps {
  children: ReactNode;
}

export const BasicPortal = (props: IBasicPortalProps) => {
  let container: HTMLDivElement | null = null;

  // If container not exist, create a div container
  if (!container) {
    container = document.createElement("div");
    container.setAttribute("role", "portal");
    document.body.appendChild(container);
  }

  // Clean up container when componentWillUnmount
  useEffect(() => {
    return function cleanup() {
      if (container) {
        document.body.removeChild(container);
      }
    };
  });

  return createPortal(props.children, container);
};
