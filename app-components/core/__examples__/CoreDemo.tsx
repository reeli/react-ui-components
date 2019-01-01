import { css } from "glamor";
import * as React from "react";
import { useRef } from "react";
import { useToggle } from "../../portal/useToggle";
import { BasicPortal } from "../../portal/BasicPortal";
import { Overlay, Position } from "../Overlay";

export function CoreDemo() {
  const [isOpen, openState, closeState] = useToggle();
  const triggerRef = useRef(null);

  return (
    <div {...css({ padding: "0 10rem" })}>
      <div onClick={openState} ref={triggerRef}>
        trigger
      </div>
      {isOpen && (
        <BasicPortal>
          <Position triggerRef={triggerRef}>
            <div onClick={closeState}>content x</div>
          </Position>
        </BasicPortal>
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
