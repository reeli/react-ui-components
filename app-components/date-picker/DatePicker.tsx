import React, { useCallback, useRef, useState } from "react";
import { Position } from "../core/Overlay";
import { Portal } from "../portal";
import { Calendar } from "./Calendar";
import { Placement } from "../core/getPlacement";
import { useOutSideClick } from "../core/useOutSideClick";
import { Input } from "../input/Input";

export function DatePicker() {
  const triggerEl = useRef(null);
  const contentEl = useRef(null);
  const [open, setOpen] = useState(false);
  const startLeave = useCallback(() => {
    // do something before close
    setOpen(false);
  }, []);

  useOutSideClick([contentEl], startLeave);

  const [value, setValue] = useState("");

  return (
    <>
      <div ref={triggerEl}>
        <Input value={value} onClick={() => setOpen(!open)} placeholder={"Choose a date..."} />
      </div>
      {open && (
        <Portal>
          <Position triggerRef={triggerEl} placement={Placement.bottomLeft}>
            <div ref={contentEl}>
              <Calendar
                selectedValue={value}
                onSelect={val => {
                  setValue(val);
                  return setOpen(false);
                }}
              />
            </div>
          </Position>
        </Portal>
      )}
    </>
  );
}
