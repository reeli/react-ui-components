import React, { FC } from "react";
import { getMonthDays, isDateBetweenStarDateAndEndDate, isTwoDateEqual } from "./utils";
import { chunk } from "lodash";
import { Day } from "./Day";

interface MonthProps {
  month: number;
  year: number;
  onClick: (value?: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
}
export const Month: FC<MonthProps> = ({ month, year, onClick, startDate, endDate }) => {
  const monthDays = getMonthDays(year, month);

  return (
    <>
      {chunk(monthDays, 7).map((weekDays, key) => (
        <tr key={key}>
          {weekDays.map(({ date, isActive }, idx) => (
            <Day
              key={idx}
              isActive={isActive}
              value={date}
              onClick={onClick}
              isHighlight={isDateBetweenStarDateAndEndDate(date, startDate, endDate)}
              isSelected={isTwoDateEqual(startDate, date) || isTwoDateEqual(endDate, date)}
            >
              {date ? date.getDate() : ""}
            </Day>
          ))}
        </tr>
      ))}
    </>
  );
};
