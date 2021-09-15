import React, { FC, useEffect, useRef, useState } from "react";
import { Portal } from "../portal";
import { Calendar } from "./Calendar";
import { Placement } from "src/core/utils/getPlacement";
import { Input } from "../input/Input";
import { Position } from "src/core/components/Position";
import { useOutSideClick, useRefValue } from "../core";
import { formatISO, format } from "date-fns";
import { isDateABeforeDateB } from "src/date-range-picker/utils";

type DateRangeValue = [startValue: string | null, endValue: string | null];

interface DateRangePickerProps {
  onChange?: (value: DateRangeValue) => void;
}

// TODO: refactor this code
const getInputValue = (startVal: Date | null, endVal: Date | null) => {
  if (startVal && endVal && isDateABeforeDateB(endVal, startVal)) {
    return {
      start: format(endVal, "yyyy-MM-dd"),
      end: format(startVal, "yyyy-MM-dd"),
    };
  }

  const start = startVal ? format(startVal, "yyyy-MM-dd") : "";
  const end = endVal ? format(new Date(endVal), "yyyy-MM-dd") : "";
  return {
    start,
    end,
  };
};

export const DateRangePicker: FC<DateRangePickerProps> = ({ onChange }) => {
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

  const notifyValueChange = (startVal: Date | null, endVal: Date | null) => {
    const startDateStr = startVal ? formatISO(startVal) : null;
    const endDateStr = endVal ? formatISO(endVal) : null;

    const val = isDateABeforeDateB(endVal, startVal) ? [endDateStr, startDateStr] : [startDateStr, endDateStr];
    onChange && onChange(val as DateRangeValue);
  };

  const { start, end } = getInputValue(startVal, endVal);

  return (
    <>
      <div ref={triggerEl}>
        <Input value={start} placeholder={"from"} name={"start date"} readOnly />
        <Input value={end} placeholder={"to"} name={"end date"} readOnly />
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
                    notifyValueChange(startVal, val);
                  }

                  if (startVal && endVal) {
                    setEndVal(null);
                    setStartVal(val);
                    notifyValueChange(null, null);
                  }
                }}
              />
            </div>
          </Position>
        </Portal>
      )}
    </>
  );
};
