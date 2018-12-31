import React, { RefObject, useCallback, useRef } from "react";
import { Portal } from "../Portal";
import { usePortal } from "../usePortal";
import { useOutSideClick } from "../useOutSideClick";

export function PortalDemo() {
  const [isOpen, open, close] = usePortal();
  const contentEl = useRef<HTMLElement>(null);
  const startLeave = useCallback(() => {
    // do something before close
    close();
  }, []);

  useOutSideClick(contentEl, startLeave);

  return (
    <div>
      <button onClick={isOpen ? startLeave : open}>button</button>
      <Portal isOpen={isOpen}>
        <div ref={contentEl as RefObject<HTMLDivElement>}>
          This is content!
          <button onClick={startLeave}>Close X</button>
        </div>
      </Portal>
    </div>
  );
}
