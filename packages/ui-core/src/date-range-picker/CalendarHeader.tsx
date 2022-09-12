import { useState, useEffect } from "react";
import { subMonths, addMonths, format } from "date-fns";
import { usePrevious } from "@ui/base";

interface ICalendarHeaderProps {
  date?: Date;
  onDateChange: (date: Date) => void;
}

const formatDate = (val: Date) => format(val, "MMMM yyyy");

export function CalendarHeader({ date, onDateChange }: ICalendarHeaderProps) {
  const [dateValue, setDate] = useState(date || new Date());
  const prevDateValue = usePrevious(dateValue);

  useEffect(() => {
    if (prevDateValue !== dateValue) {
      onDateChange(dateValue);
    }
  }, [dateValue]);

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
      }}
    >
      <div>
        <button onClick={() => setDate(subMonths(dateValue, 1))}>{"<"}</button>
        <div>{formatDate(dateValue)}</div>
        <button onClick={() => setDate(addMonths(dateValue, 1))}>{">"}</button>
      </div>
    </div>
  );
}
