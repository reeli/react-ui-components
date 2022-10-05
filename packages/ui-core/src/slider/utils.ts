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

export const calcPercentage = (value: number, maxValue: number) => {
  if (maxValue === 0) {
    return 0;
  }

  return Math.round(value / maxValue * 100);
};
