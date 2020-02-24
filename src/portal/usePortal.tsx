import { createPortal } from "react-dom";
import React, { ReactNode, useContext, useEffect, useMemo, useRef } from "react";
import { PortalContext, PortalProvider } from "src/portal/PortalContext";
import { useRefValue, useToggle } from "src/core";

export const usePortal = (defaultVisible = false) => {
  const [visible, show, hide] = useToggle(defaultVisible);
  const visibleRef = useRefValue(visible);
  const { container: rootContainer } = useContext(PortalContext);
  const containerRef = useRef<HTMLElement | null>(null);

  if (!containerRef.current) {
    containerRef.current = document.createElement("div");
    containerRef.current.setAttribute("role", "portal");
    rootContainer.appendChild(containerRef.current);
  }

  useEffect(() => {
    return function cleanup() {
      if (containerRef.current) {
        rootContainer.removeChild(containerRef.current);
      }
    };
  }, []);

  const renderPortal = useMemo(
    () => (children: ReactNode) =>
      visibleRef.current && (
        <PortalProvider
          value={{
            container: containerRef.current!,
          }}
        >
          {createPortal(children, containerRef.current!)}
        </PortalProvider>
      ),
    [],
  );

  return [renderPortal, show, hide, visible] as const;
};
