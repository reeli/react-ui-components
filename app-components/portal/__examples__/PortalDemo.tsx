import React from "react";
import { Portal } from "../Portal";
import { usePortal } from "../usePortal";

export function PortalDemo() {
  const [isOpen, open, close] = usePortal();
  return (
    <div>
      <button onClick={isOpen ? close : open}>button</button>
      <Portal isOpen={isOpen}>
        <span>
          gooooooooooooood!! <span onClick={close}>X</span>
        </span>
      </Portal>
    </div>
  );
}
