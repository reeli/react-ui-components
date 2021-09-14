import React, { useState, FC } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarBody } from "./CalendarBody";
import { getMonth, getYear } from "date-fns";

interface CalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  onClick: (val?: Date | null) => void;
}

export const Calendar: FC<CalendarProps> = ({ onClick, startDate, endDate }) => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <CalendarHeader date={date} onDateChange={(val) => setDate(val)} />
      <CalendarBody
        month={getMonth(date)}
        year={getYear(date)}
        onClick={onClick}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};
