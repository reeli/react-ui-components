import { addDays, endOfMonth, getDaysInMonth, startOfMonth, subDays } from "date-fns";
import { range } from "lodash";

const totalDaysCount = 7 * 6;

interface Day {
  date: Date;
  isActive: boolean;
}

export const getMonthDays = (year: number, month: number): Day[] => {
  const date = new Date(year, month, 1);

  const headDays = genDays({ date, isHead: true, isTail: false });
  const monthDays = genDays({ date, isHead: false, isTail: false });
  const tailDays = genDays({ date, isHead: false, isTail: true });

  return [...headDays, ...monthDays, ...tailDays];
};

const genDays = ({ date, isHead, isTail }: { date: Date; isHead: boolean; isTail: boolean }) => {
  const daysOfMonth = getDaysInMonth(date);
  const startDayOfMonth = startOfMonth(date);
  const endDayOfMonth = endOfMonth(date);
  const headDaysCount = startDayOfMonth.getDay(); // 给定的 date 是一周的第几天
  const tailDaysCount = totalDaysCount - headDaysCount - daysOfMonth;

  if (isHead) {
    const list = range(0, headDaysCount);

    return list.map((_, idx) => ({
      date: subDays(startDayOfMonth, list.length - idx),
      isActive: false,
    }));
  }

  if (isTail) {
    return range(0, tailDaysCount).map((_, idx) => ({
      date: addDays(endDayOfMonth, idx + 1),
      isActive: false,
    }));
  }

  return range(0, daysOfMonth).map((_, idx) => ({
    date: addDays(startDayOfMonth, idx),
    isActive: true,
  }));
};
