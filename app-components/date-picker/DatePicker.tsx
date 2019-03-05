import React, { useState } from "react";
import { chunk, map } from "lodash";
import { getMonthDate } from "./utils";
import moment from "moment";

const countYearMonth = ({ year, month }: { year: number; month: number }) => {
  let temp: { year: number; month: number } = {
    year,
    month,
  };

  if (month < 0) {
    temp = {
      year: year - 1,
      month: 11,
    };
  }

  if (month > 11) {
    temp = {
      year: year + 1,
      month: 0,
    };
  }

  return temp;
};

export function DatePicker() {
  const current = {
    month: moment().month(),
    year: moment().year(),
  };
  const [monthDate, setMonthDate] = useState({
    year: current.year,
    month: current.month,
  });

  return (
    <div>
      <button
        onClick={() => {
          setMonthDate(
            countYearMonth({
              year: monthDate.year,
              month: monthDate.month - 1,
            }),
          );
        }}
      >
        prev
      </button>
      <button
        onClick={() => {
          setMonthDate(
            countYearMonth({
              year: monthDate.year,
              month: monthDate.month + 1,
            }),
          );
        }}
      >
        next
      </button>
      <div>{moment([monthDate.year, monthDate.month]).format("YYYY MM")} 月</div>
      <table>
        <thead>
          <tr>
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
          </tr>
        </thead>
        <tbody>
          {chunk(getMonthDate(moment([monthDate.year, monthDate.month, 1])), 7).map((row, idx) => {
            return (
              <tr key={idx}>
                {map(row, (week, idx) => (
                  <td
                    key={idx}
                    style={{ padding: 10, color: week.isHead || week.isTail ? "#ccc" : "black" }}
                    onClick={() => {}}
                  >
                    {week.day}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
