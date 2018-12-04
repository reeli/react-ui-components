import { forEach, keys, pickBy } from 'lodash';
import { TSelectedState, TSelectedValues } from './interfaces';

export const toSelectedValues = (selectedState: TSelectedState): TSelectedValues =>
  keys(pickBy(selectedState, isSelected => isSelected));

export const toSelectedState = (arr?: TSelectedValues) => {
  const temp = {} as TSelectedState;
  forEach(arr, key => {
    temp[key] = true;
  });
  return temp;
};
