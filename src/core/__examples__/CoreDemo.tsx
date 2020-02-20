import React, { useRef } from "react";
import { useToggle } from "src/core/hooks/useToggle";
import { Portal } from "../../portal";
import { Overlay } from "src/core/components/Overlay";
import { Position } from "src/core/components/Position";

export function CoreDemo() {
  const [isShow, show, hide] = useToggle();
  const triggerRef = useRef(null);

  return (
    <div css={{ padding: "0 10rem" }}>
      <div onClick={show} ref={triggerRef}>
        trigger
      </div>
      {isShow && (
        <Portal>
          <Position triggerRef={triggerRef}>
            <div onClick={hide}>content x</div>
          </Position>
        </Portal>
      )}
      ------------------------------------
      <Overlay
        trigger={({ triggerEl, open }) => {
          return (
            <div ref={triggerEl} onClick={open}>
              this is trigger
            </div>
          );
        }}
        content={({ close }) => {
          return <div onClick={close}>content</div>;
        }}
      />
    </div>
  );
}
