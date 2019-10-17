import { css } from "glamor";
import * as React from "react";
import { useRef } from "react";
import { useToggle } from "../useToggle";
import { Portal } from "../../portal";
import { Overlay, Position } from "../Overlay";

export function CoreDemo() {
  const [isShow, show, hide] = useToggle();
  const triggerRef = useRef(null);

  return (
    <div {...css({ padding: "0 10rem" })}>
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
