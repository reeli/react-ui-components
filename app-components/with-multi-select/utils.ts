import { forEach, keys, pickBy } from 'lodash';
import { ISelectOption, TSelectedState, TSelectedValues } from './interfaces';

export const toSelectedValues = (selectedState: TSelectedState): TSelectedValues =>
  keys(pickBy(selectedState, isSelected => isSelected));

export const toSelectedState = (selectedValues: TSelectedValues = [], options: ISelectOption[]) => {
  const temp = {} as TSelectedState;

  forEach(options, option => {
    selectedValues.includes(option.value) ? (temp[option.value] = true) : (temp[option.value] = false);
  });

  return temp;
};
