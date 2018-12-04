import { Dictionary } from 'lodash';

export interface ISelectOption {
  value: string | number;
  display: string | number;
}

export type TSelectedValue = string|number;
export type TSelectedValues = Array<TSelectedValue>;
export type TSelectedState = Dictionary<boolean>;
