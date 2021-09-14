import React, { useState } from "react";
import moment from "moment";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarBody } from "./CalendarBody";

export function Calendar({ onSelect, selectedValue }: { selectedValue?: string | null; onSelect: (val: any) => void }) {
  const [date, setDate] = useState(selectedValue ? moment(selectedValue) : moment());

  return (
    <div>
      <CalendarHeader date={date} onDateChange={(value) => setDate(value)} />
      <CalendarBody month={date.month()} year={date.year()} onSelect={onSelect} selectedValue={selectedValue} />
    </div>
  );
}
