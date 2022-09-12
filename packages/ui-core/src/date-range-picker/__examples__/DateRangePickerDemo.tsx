import React from "react";
import { DateRangePicker } from "../DateRangePicker";

export function DateRangePickerDemo() {
  return (
    <DateRangePicker
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
}
