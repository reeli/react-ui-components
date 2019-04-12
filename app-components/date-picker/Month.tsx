import React, { useState } from "react";
import moment from "moment";
import { getMonthDays } from "./utils";
import { chunk } from "lodash";
import { Day } from "./Day";

interface IMonthProps {
  month: number;
  year: number;
  onSelect: (val: any) => void;
}

export function Month({ month, year, onSelect }: IMonthProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const monthDays = getMonthDays(moment([year, month, 1]));

  return (
    <tbody>
      {chunk(monthDays, 7).map((weekDays, key) => (
        <tr key={key}>
          {weekDays.map(({ isHeadOrTail, disabled, date, current, day }, idx) => {
            const value = date.format("YYYY-MM-DD");
            return (
              <Day
                key={idx}
                current={current}
                isHeadOrTail={isHeadOrTail}
                selected={selected === value}
                disabled={disabled}
                value={value}
                onSelect={val => {
                  console.log(val);
                  onSelect(val);
                  return setSelected(val);
                }}
              >
                {day}
              </Day>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}
