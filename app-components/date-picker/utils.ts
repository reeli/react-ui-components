import moment, { Moment } from "moment";
import { isEmpty, map, range } from "lodash";

interface IDay {
  year?: number;
  month: number;
  day: number;
  date?: Moment;
  isHead: boolean;
  isTail: boolean;
}

const genDay = ({
  days,
  isHead = false,
  isTail = false,
  month,
}: {
  days: number[];
  month: number;
  isHead?: boolean;
  isTail?: boolean;
}) => {
  if (isEmpty(days)) {
    return [];
  }
  return map(days, day => {
    return {
      day,
      isTail,
      isHead,
      month,
    };
  });
};

export const getMonthDate = (m: Moment = moment()): IDay[] => {
  // 获取本月的第一天是一周的第几天，用 0-6 来表示，其中 0 表示星期天，6 表示星期六
  const firstDayOfMonthAtWeek = m.startOf("month").day();
  const lastDayOfMonthAtWeek = m.endOf("month").day(); // 获取本月最后一天是一周的第几天
  const prevMonthTotalDays = m.subtract(1, "month").daysInMonth(); // 上月一共有几天

  const prev = range(prevMonthTotalDays - firstDayOfMonthAtWeek + 1, prevMonthTotalDays + 1);
  const next = 6 - lastDayOfMonthAtWeek > 0 ? range(1, 6 - lastDayOfMonthAtWeek + 1) : [];
  const current = range(1, moment().daysInMonth() + 1);
  const currentMonth = moment().month() + 1;
  const headDays = genDay({ days: prev, isHead: true, month: currentMonth - 1 });
  const tailDays = genDay({ days: next, isTail: true, month: currentMonth + 1 });
  const currentDay = genDay({ days: current, month: currentMonth });

  return [...headDays, ...currentDay, ...tailDays];
};
