import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const Portal: React.FC = props => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  if (!containerRef.current) {
    containerRef.current = document.createElement("div");
    containerRef.current.setAttribute("role", "portal");
    document.body.appendChild(containerRef.current);
  }

  useEffect(() => {
    return function cleanup() {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, []);

  return createPortal(props.children, containerRef.current);
};
