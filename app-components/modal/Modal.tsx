import * as React from "react";
import { BasicPortal } from "../portal/BasicPortal";
import { useToggle } from "../portal/useToggle";

export const Modal = () => {
  const [isOpen, open, close] = useToggle();
  return (
    <>
      <div onClick={open}>trigger</div>
      {isOpen && (
        <BasicPortal>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              background: "rgba(0,0,0,0.7)",
              zIndex: 999,
            }}
            onClick={close}
          />
          <div style={{ background: "#fff", width: 200, position: "absolute", zIndex: 1000 }}>content</div>
        </BasicPortal>
      )}
    </>
  );
};
