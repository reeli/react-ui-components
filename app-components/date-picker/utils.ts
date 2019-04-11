import moment, { Moment } from "moment";
import { map, range } from "lodash";

interface IDay {
  year?: number;
  month: number;
  day: number;
  date?: Moment;
  isHead: boolean;
  isTail: boolean;
}

const getDateByBaseDate = (date: IBaseDate, idx: number, isHead: boolean, isTail: boolean) => {
  if (!isHead && !isTail) {
    return date.startDayInMonth.clone().add(idx, "day");
  }
  if (isHead) {
    return date.startDayInMonth.clone().subtract(idx + 1, "day");
  }

  return date.endDayInMonth.clone().add(idx + 1, "day");
};

interface IBaseDate {
  startDayInMonth: Moment;
  endDayInMonth: Moment;
}

const genDays = ({
  days,
  isHead,
  isTail,
  baseDate,
}: {
  days: number;
  isHead: boolean;
  isTail: boolean;
  baseDate: IBaseDate;
}) => {
  const total = range(0, days);
  return map(total, day => {
    const date = getDateByBaseDate(baseDate, day, isHead, isTail);
    return {
      date,
      isHead,
      isTail,
      ...getYearMonthDayByDate(date),
    };
  });
};

const getYearMonthDayByDate = (date: Moment) => {
  return {
    year: date.year(),
    month: date.month(),
    day: Number(date.format("DD")),
  };
};

export const getMonthDays = (m: Moment = moment()): IDay[] => {
  const dateStr = m.format("YYYY-MM-DD");
  const startDayInMonth = moment(dateStr).startOf("month");
  const endDayInMonth = moment(dateStr).endOf("month");

  // 获取本月的第一天是一周的第几天，用 0-6 来表示，其中 0 表示星期天，6 表示星期六
  const firstDayOfMonthAtWeek = moment(dateStr)
    .startOf("month")
    .day();

  // 获取本月一共有多少天
  const daysInMonth = moment(dateStr).daysInMonth();

  const headDays = genDays({
    days: firstDayOfMonthAtWeek,
    isHead: true,
    isTail: false,
    baseDate: {
      startDayInMonth,
      endDayInMonth,
    },
  });

  const tailDays = genDays({
    days: 42 - daysInMonth - firstDayOfMonthAtWeek,
    isHead: false,
    isTail: true,
    baseDate: {
      startDayInMonth,
      endDayInMonth,
    },
  });

  const currentDays = genDays({
    days: daysInMonth,
    isHead: false,
    isTail: false,
    baseDate: {
      startDayInMonth,
      endDayInMonth,
    },
  });

  return [...headDays, ...currentDays, ...tailDays];
};
