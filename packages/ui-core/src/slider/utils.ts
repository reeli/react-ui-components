import { isUndefined, isNull } from "lodash";

export const constraintValue = (value: number, min: number = 0, max: number = 100) => {
  if (!value) {
    return min;
  }

  if (value > max) {
    return max;
  }

  if (value < min) {
    return min;
  }

  return value;
};

export const calcPercentage = (value: number, max: number, min: number) => {
  if (max === 0) {
    return 0;
  }

  if (value - min < 0) {
    return 0;
  }

  return Math.round(((value - min) / (max - min)) * 100);
};

export const isExists = <T>(value?: T): value is NonNullable<T> => !isUndefined(value) && !isNull(value);
