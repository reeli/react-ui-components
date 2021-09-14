import React from "react";
import { getMonthDays } from "./utils";
import { chunk } from "lodash";
import { Day } from "./Day";

interface IMonthProps {
  month: number;
  year: number;
  onSelect: (val: any) => void;
  selectedValue?: string | null;
}

export function Month({ month, year, onSelect }: IMonthProps) {
  const monthDays = getMonthDays(year, month);

  return (
    <>
      {chunk(monthDays, 7).map((weekDays, key) => (
        <tr key={key}>
          {weekDays.map(({ date, isActive }, idx) => (
            <Day
              key={idx}
              isActive={isActive}
              selected={false}
              value={date}
              onSelect={(val) => {
                onSelect(val);
              }}
            >
              {date.getDate()}
            </Day>
          ))}
        </tr>
      ))}
    </>
  );
}
