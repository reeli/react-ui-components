import React from "react";
import { Week } from "./Week";
import moment from "moment";
import { getMonthDays } from "./utils";
import { chunk } from "lodash";

interface IMonthProps {
  month: number;
  year: number;
}

export function Month({ month, year }: IMonthProps) {
  return (
    <tbody>
      {chunk(getMonthDays(moment([year, month, 1])), 7).map((weekDays, idx) => (
        <Week days={weekDays} key={idx} />
      ))}
    </tbody>
  );
}
