import moment, { Moment } from "moment";
import { map, range } from "lodash";

interface IDay {
  date: Moment;
  current: boolean;
  disabled: boolean;
  isHeadOrTail: boolean;
  year: number;
  month: number;
  day: number;
}

const ROWS = 6;

export const getMonthDays = (baseDate: Moment = moment()): IDay[] => {
  // 获取本月的第一天是一周的第几天，用 0-6 来表示，其中 0 表示星期天，6 表示星期六
  const firstDayOfMonth = getFirstDayOfMonth(baseDate);

  // 获取本月一共有多少天
  const daysInMonth = baseDate.daysInMonth();

  const headDays = genDays({
    days: firstDayOfMonth,
    isHead: true,
    baseDate,
  });

  const tailDays = genDays({
    days: ROWS * 7 - daysInMonth - firstDayOfMonth,
    isTail: true,
    baseDate,
  });

  const currentDays = genDays({
    days: daysInMonth,
    baseDate,
  });

  return [...headDays, ...currentDays, ...tailDays];
};

interface IGenDateParams {
  baseDate: Moment;
  idx: number;
  isHead?: boolean;
  isTail?: boolean;
}

const genDate = ({ baseDate, isHead, isTail, idx }: IGenDateParams) => {
  if (isTail) {
    const endDayOfMonth = getEndOfMonth(baseDate);
    return getTailDateByIdx(endDayOfMonth, idx);
  }

  const startDayOfMonth = getStartOfMonth(baseDate);

  if (isHead) {
    return getHeadDateByIdx(startDayOfMonth, idx);
  }

  return getDateByIdx(startDayOfMonth, idx);
};

interface IGenDaysParams {
  days: number;
  baseDate: Moment;
  isHead?: boolean;
  isTail?: boolean;
}

const isToday = (date: Moment) => {
  return moment().format("YYYY-MM-DD") === date.format("YYYY-MM-DD");
};

const genDays = ({ days, isHead, isTail, baseDate }: IGenDaysParams) => {
  const total = range(0, days);

  return map(total, day => {
    const date = genDate({
      baseDate,
      idx: day,
      isHead,
      isTail,
    });

    return {
      date,
      current: !isHead && !isTail && isToday(date),
      disabled: false,
      isHeadOrTail: !!isHead || !!isTail,
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

const getStartOfMonth = (m: Moment) => m.clone().startOf("month");
const getEndOfMonth = (m: Moment) => m.clone().endOf("month");
const getFirstDayOfMonth = (m: Moment) => getStartOfMonth(m).day();

const getHeadDateByIdx = (startOfMonth: Moment, idx: number) => startOfMonth.clone().subtract(idx + 1, "day");
const getDateByIdx = (startOfMonth: Moment, idx: number) => startOfMonth.clone().add(idx, "day");
const getTailDateByIdx = (endOfMonth: Moment, idx: number) => endOfMonth.clone().add(idx + 1, "day");
