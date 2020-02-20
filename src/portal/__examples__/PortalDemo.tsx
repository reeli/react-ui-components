import React, { RefObject, useCallback, useRef } from "react";
import { useToggle } from "src/core/hooks/useToggle";
import { useOutSideClick } from "src/core/hooks/useOutSideClick";
import { Portal } from "../Portal";

export function PortalDemo() {
  const [isOpen, open, close] = useToggle();
  const contentEl = useRef<HTMLElement>(null);
  const startLeave = useCallback(() => {
    // do something before close
    close();
  }, []);

  useOutSideClick([contentEl], startLeave);

  return (
    <div style={{ height: "900px", overflow: "scroll" }}>
      <button onClick={isOpen ? startLeave : open}>button</button>
      {isOpen && (
        <Portal>
          <div ref={contentEl as RefObject<HTMLDivElement>}>
            This is content!
            <button onClick={startLeave}>Close X</button>
          </div>
        </Portal>
      )}
    </div>
  );
}
