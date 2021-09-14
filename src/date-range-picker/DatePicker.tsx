import React, { useEffect, useRef, useState } from "react";
import { Portal } from "../portal";
import { Calendar } from "./Calendar";
import { Placement } from "src/core/utils/getPlacement";
import { Input } from "../input/Input";
import { Position } from "src/core/components/Position";
import { useOutSideClick, useRefValue } from "../core";

export function DatePicker() {
  const triggerEl = useRef(null);
  const contentEl = useRef(null);
  const [open, setOpen] = useState(false);
  // const startLeave = useCallback(() => {
  //   // do something before close
  //   setOpen(false);
  // }, []);

  useEffect(() => {
    setOpen(true);

    return () => {
      setOpen(false);
    };
  }, []);

  const [startVal, setStartVal] = useState<Date | null>(null);
  const [endVal, setEndVal] = useState<Date | null>(null);
  const endValRef = useRefValue(endVal);

  useOutSideClick(
    [contentEl],
    () => {
      if (!endValRef.current) {
        setStartVal(null);
      }
    },
    open,
  );

  return (
    <>
      <div ref={triggerEl}>
        <Input value={""} onClick={() => {}} placeholder={"from"} name={""} />
        <Input value={""} onClick={() => {}} placeholder={"to"} name={""} />
      </div>
      {open && (
        <Portal>
          <Position triggerRef={triggerEl} placement={Placement.bottomLeft}>
            <div ref={contentEl}>
              <Calendar
                startDate={startVal}
                endDate={endVal}
                onClick={(val) => {
                  if (!val) {
                    return;
                  }

                  if (!startVal) {
                    setStartVal(val);
                    return;
                  }

                  if (!endVal) {
                    setEndVal(val);
                  }

                  if (startVal && endVal) {
                    setEndVal(null);
                    setStartVal(val);
                  }
                }}
              />
            </div>
          </Position>
        </Portal>
      )}
    </>
  );
}
