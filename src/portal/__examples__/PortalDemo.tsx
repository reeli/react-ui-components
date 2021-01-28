import React, { useCallback, useRef } from "react";
import { useToggle } from "src/core/hooks/useToggle";
import { Portal } from "../Portal";
import { Demo } from "style-guide/components/Demo";
import { Button } from "src/button";
import { PortalProvider } from "src/portal/PortalContext";
import { useOutSideClick } from "src/core";

export function PortalDemo() {
  const [isOpen, open, close] = useToggle();

  return (
    <Demo title={"Basic Portal"}>
      <div>
        <Button onClick={isOpen ? close : open}>Mount/Unmount Portal</Button>
        {isOpen && (
          <Portal>
            <p>This dom element will be transfer to document.body! 001</p>
          </Portal>
        )}
      </div>
    </Demo>
  );
}

export function PortalDemo2() {
  const [isOpen, open, close] = useToggle();
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <Demo title={"Customize Portal Container"}>
      <div role={"current component"}>
        <Button onClick={isOpen ? close : open}>Mount/Unmount Portal</Button>
        {isOpen && <p>It look look I render here!</p>}

        {isOpen && (
          <>
            <PortalProvider
              value={{
                container: containerRef.current as HTMLDivElement,
              }}
            >
              <Portal>
                <p>But I actually render here!</p>
              </Portal>
            </PortalProvider>
          </>
        )}
      </div>
      <div ref={containerRef} role={"outside of current component hierarchy"} />
    </Demo>
  );
}

export function PortalDemo3() {
  const [isOpen, open, close] = useToggle();
  const contentEl = useRef<HTMLParagraphElement>(null);
  const triggerEl = useRef<HTMLButtonElement>(null);
  const startLeave = useCallback(() => {
    close(); // you can do something before close
  }, []);

  useOutSideClick([triggerEl, contentEl], startLeave);

  return (
    <Demo title={"Portal with Click Outside"}>
      <Button onClick={isOpen ? close : open} ref={triggerEl}>
        Mount/Unmount Portal
      </Button>
      {isOpen && (
        <Portal>
          <p ref={contentEl}>This dom element will be transfer to document.body! 003</p>
        </Portal>
      )}
    </Demo>
  );
}

export function PortalDemo4() {
  const [isOpen, open, close] = useToggle();

  return (
    <Demo title={"Portal with Scroll"}>
      <div style={{ height: "900px", overflow: "scroll" }}>
        <Button onClick={isOpen ? close : open}>Mount/Unmount Portal</Button>
        {isOpen && (
          <Portal>
            <p>This dom element will be transfer to document.body! 004</p>
          </Portal>
        )}
      </div>
    </Demo>
  );
}
