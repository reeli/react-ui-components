import React, { useState } from "react";
import moment, { Moment } from "moment";

interface ICalendarHeaderProps {
  date?: Moment;
  onDateChange: (date: Moment) => void;
}

export function CalendarHeader({ date, onDateChange }: ICalendarHeaderProps) {
  const [dateValue, setDate] = useState(date || moment());
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
      }}
    >
      <div>
        <button
          onClick={() => {
            const value = dateValue.clone().subtract(1, "year");
            onDateChange(value);
            setDate(value);
          }}
        >
          {"<<"}
        </button>
        <button
          onClick={() => {
            const value = dateValue.clone().subtract(1, "month");
            onDateChange(value);
            setDate(value);
          }}
        >
          {"<"}
        </button>
      </div>
      <div>{dateValue.format("YYYY MM")} 月</div>

      <div>
        <button
          onClick={() => {
            const date = dateValue.clone().add(1, "month");
            onDateChange(date);
            setDate(date);
          }}
        >
          {">"}
        </button>
        <button
          onClick={() => {
            const value = dateValue.clone().add(1, "year");
            onDateChange(value);
            setDate(value);
          }}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
