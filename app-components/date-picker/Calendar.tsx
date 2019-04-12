import React, { useCallback, useRef, useState } from "react";
import { Position } from "../core/Overlay";
import { BasicPortal } from "../portal/BasicPortal";
import { PickerTable } from "./PickerTable";
import { Placement } from "../core/usePlacement";
import { useOutSideClick } from "../portal/useOutSideClick";
import { Input } from "../input/Input";

export function Calendar() {
  const triggerEl = useRef(null);
  const contentEl = useRef(null);
  const [open, setOpen] = useState(false);
  const startLeave = useCallback(() => {
    // do something before close
    setOpen(false);
  }, []);

  useOutSideClick(contentEl, startLeave);

  const [value, setValue] = useState("");

  return (
    <>
      <div style={{ width: 400 }} ref={triggerEl}>
        <Input value={value} onClick={() => setOpen(!open)} placeholder={"Choose a date..."} />
      </div>
      {open && (
        <BasicPortal>
          <Position triggerRef={triggerEl} placement={Placement.bottomLeft}>
            <div ref={contentEl}>
              <PickerTable
                onSelect={val => {
                  setValue(val);
                  return setOpen(false);
                }}
              />
            </div>
          </Position>
        </BasicPortal>
      )}
    </>
  );
}
