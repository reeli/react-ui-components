import  { useCallback, useRef } from "react";
import { useToggle,useOutSideClick } from "../../core";
import { Portal } from "../Portal";
import { Button } from "../../button";
import { PortalProvider } from "../PortalContext";

export function PortalDemo() {
  const [isOpen, open, close] = useToggle();

  return (
    <div>
      <h2>Basic Portal</h2>
      <div>
        <Button onClick={isOpen ? close : open}>Mount/Unmount Portal</Button>
        {isOpen && (
          <Portal>
            <p>This dom element will be transfer to document.body! 001</p>
          </Portal>
        )}
      </div>
    </div>
  );
}

export function PortalDemo2() {
  const [isOpen, open, close] = useToggle();
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <h2>Customize Portal Container</h2>
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
    </div>
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
    <div>
      <h2>Portal with Click Outside</h2>
      <Button onClick={isOpen ? close : open} ref={triggerEl}>
        Mount/Unmount Portal
      </Button>
      {isOpen && (
        <Portal>
          <p ref={contentEl}>This dom element will be transfer to document.body! 003</p>
        </Portal>
      )}
    </div>
  );
}

export function PortalDemo4() {
  const [isOpen, open, close] = useToggle();

  return (
    <div>
      <h2>Portal with Scroll</h2>
      <div style={{ height: "900px", overflow: "scroll" }}>
        <Button onClick={isOpen ? close : open}>Mount/Unmount Portal</Button>
        {isOpen && (
          <Portal>
            <p>This dom element will be transfer to document.body! 004</p>
          </Portal>
        )}
      </div>
    </div>
  );
}
