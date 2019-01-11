import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface IBasicPortalProps {
  children: ReactNode;
}

export const BasicPortal = (props: IBasicPortalProps) => {
  let containerRef = useRef<HTMLDivElement | null>(null);

  // If container not exist, create a div container
  if (!containerRef.current) {
    containerRef.current = document.createElement("div");
    containerRef.current.setAttribute("role", "portal");
    containerRef.current.setAttribute("data-time", `${new Date().getTime()}`);
    document.body.appendChild(containerRef.current);
  }

  // Clean up container when componentWillUnmount
  useEffect(() => {
    return function cleanup() {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, []);

  return createPortal(props.children, containerRef.current);
};
