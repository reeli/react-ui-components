import React from "react";
import { Day } from "./Day";
import moment, { Moment } from "moment";

interface IWeekProps {
  days: {
    year?: number;
    month: number;
    day: number;
    date?: Moment;
    isHead: boolean;
    isTail: boolean;
  }[];
}

export function Week({ days }: IWeekProps) {
  return (
    <tr>
      {days.map(({ date, isHead, isTail, day }, idx) => (
        <Day
          key={idx}
          onSelect={() => {}}
          date={date || moment()}
          enable={!isHead && !isTail}
          selected={false}
          active={false}
          day={day}
        />
      ))}
    </tr>
  );
}
