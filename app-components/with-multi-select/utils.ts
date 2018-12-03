import { filter, forEach, isEmpty } from 'lodash';
import { ISelectedValues, TSelectedValuesMap } from './interfaces';

export const toSelectedValuesMap = (selectedValues?: ISelectedValues): TSelectedValuesMap => {
  const selectedValuesMap = new Map();

  if (isEmpty(selectedValues)) {
    return selectedValuesMap;
  }

  forEach(selectedValues, value => {
    selectedValuesMap.set(value, true);
  });

  return selectedValuesMap;
};

export const toSelectedValues = (selectedMap: TSelectedValuesMap): ISelectedValues => {
  return [...selectedMap.keys()];
};

export const dropValue = (value: string | number, values: ISelectedValues = []) => {
  return filter(values, (val: string | number) => val !== value) as ISelectedValues | any[];
};

export const addValue = (value: string | number, values: ISelectedValues = []) => {
  return [...values, value] as ISelectedValues | any[];
};
