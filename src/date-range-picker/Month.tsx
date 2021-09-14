import React, { FC } from "react";
import { getMonthDays } from "./utils";
import { chunk } from "lodash";
import { Day } from "./Day";
import { isEqual, getTime, getYear, getMonth, getDate } from "date-fns";

interface MonthProps {
  month: number;
  year: number;
  onClick: (value?: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
}

const isTwoDateEqual = (dateA?: Date | null, dateB?: Date | null) => {
  if (!dateA || !dateB) {
    return false;
  }

  return isEqual(
    new Date(getYear(dateA), getMonth(dateA), getDate(dateA)),
    new Date(getYear(dateB), getMonth(dateB), getDate(dateB)),
  );
};

const isDateBetweenStarDateAndEndDate = (date?: Date, startDate?: Date | null, endDate?: Date | null) => {
  if (!date || !startDate || !endDate) {
    return false;
  }
  //TODO: refactor this code later

  if (startDate > endDate) {
    return getTime(date) > getTime(endDate) && getTime(date) < getTime(startDate);
  }

  return getTime(date) > getTime(startDate) && getTime(date) < getTime(endDate);
};

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
