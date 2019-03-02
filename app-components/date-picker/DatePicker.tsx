import React from "react";
import moment from "moment";
import { chunk, map, range } from "lodash";
import { getMonthDate } from "./utils";

export function DatePicker() {
  console.log(getMonthDate());
  const startDay = moment()
    .startOf("month")
    .day(0);
  const endDay = moment()
    .endOf("month")
    .day(6); // 6+7*5  5 Saturdays from now

  const daysBefore = startDay.format("DD");
  const daysBeforeEnd = startDay.daysInMonth();
  const before = range(Number(daysBefore), daysBeforeEnd + 1);

  const daysAfter = endDay.format("DD");
  const after = range(1, Number(daysAfter) + 1);

  const total = [...before, ...range(1, moment().daysInMonth() + 1), ...after];

  const prev = moment()
    .startOf("month")
    .subtract(1, "month")
    .format("M");
  const next = moment()
    .startOf("month")
    .add(1, "month")
    .format("M");
  console.log(prev, next);
  return (
    <div>
      <button>prev</button>
      <button>next</button>
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
        {chunk(total, 7).map((row, idx) => {
          return (
            <tr key={idx}>
              {map(row, (day, idx) => (
                <td key={idx} style={{ padding: 10 }} onClick={() => {}}>
                  {day}
                </td>
              ))}
            </tr>
          );
        })}
      </table>
    </div>
  );
}
