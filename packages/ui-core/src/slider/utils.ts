import { isUndefined } from "lodash";


export const constraintPercentage = (percentage: number) => {
  if (!percentage) {
    return 0;
  }

  if (percentage > 100) {
    return 100;
  }

  if (percentage < 0) {
    return 0;
  }

  return percentage;
};


export const getDefaultPercentage = ({
                                defaultValue,
                                min,
                                max,
                                step,
                              }: {
  defaultValue: number;
  step: number;
  min?: number;
  max?: number;
}) => {
  if (!step || isUndefined(max) || isUndefined(min)) {
    return defaultValue;
  }

  if (defaultValue % step !== 0) {
    throw new Error("Default value is incompatible with the step");
  }

  let val = defaultValue;

  if (defaultValue < min) {
    val = min;
  }

  if (defaultValue > max) {
    val = max;
  }

  return Math.round(val / max) * 100;
};

export const calSteps = (step: number, max?: number, min?: number) => {
  if (isUndefined(step) || isUndefined(max) || isUndefined(min)) {
    return [];
  }

  const numberOfMarks = Math.ceil(max / step);
  return new Array(numberOfMarks + 1).fill(0).map((_, idx) => {
    const next = idx * step;
    if (next < min) {
      return min;
    }

    if (next > max) {
      return max;
    }

    return next;
  });
};
