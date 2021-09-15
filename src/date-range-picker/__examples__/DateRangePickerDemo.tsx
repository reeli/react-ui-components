import React from "react";
import { DateRangePicker } from "../DateRangePicker";

export class DateRangePickerDemo extends React.Component<any, any> {
  render() {
    return (
      <DateRangePicker
        onChange={(value) => {
          console.log(value);
        }}
      />
    );
  }
}
