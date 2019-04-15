import React, { useState } from "react";
import moment from "moment";
import { getMonthDays } from "./utils";
import { chunk } from "lodash";
import { Day } from "./Day";

interface IMonthProps {
  month: number;
  year: number;
  onSelect: (val: any) => void;
  selectedValue?: string | null;
}

export function Month({ month, year, onSelect, selectedValue = null }: IMonthProps) {
  const [selected, setSelected] = useState<string | null>(selectedValue);
  const monthDays = getMonthDays(moment([year, month, 1]));

  return (
    <>
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
                  setSelected(val);
                  onSelect(val);
                }}
              >
                {day}
              </Day>
            );
          })}
        </tr>
      ))}
    </>
  );
}
