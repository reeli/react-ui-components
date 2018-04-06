import {
  Dictionary,
  filter,
  forEach,
  includes,
  isEqual,
  keys,
  pickBy,
} from 'lodash';
import * as React from 'react';
import { ReactNode } from 'react';

export interface ISelectOption {
  value: string | number;
  display: string | number;
}

export type ISelectedValues = string[] | number[];

interface IMultiSelectInnerProps {
  updateSelectedValues: (value: ISelectedValues) => void;
  selectedValues?: ISelectedValues;
}

// controlled MultiSelect and uncontrolled MultiSelect
// controlled MultiSelect: selectedValue, updateSelectedValue 状态全部由外部去维护，可以通过改变 selectedValue 和直接调用 updateSelectedValue 两种方式去更新
// uncontrolled MultiSelect: selectedValue, onSelectedValuesChange 状态由内部维护，但是当内部状态发生变化时，需要将内部状态通知给外部，然后再通过外部的 state 更新 value

export interface IMultiSelectProps {
  selectedValues?: ISelectedValues;
  onSelectedValuesChange?: (selectedValues?: ISelectedValues) => void;
  children: (props: IMultiSelectInnerProps) => ReactNode;
}

interface IMultiSelectState {
  selected: Dictionary<boolean>
}

export const dropValue = (value: string | number, values: ISelectedValues = []) => {
  return filter(values, (val: string | number) => val !== value) as ISelectedValues | any[];
};

export const addValue = (value: string | number, values: ISelectedValues = []) => {
  return [
    ...values,
    value,
  ] as ISelectedValues | any[];
};

export const isValueInSelectedValues = (value: string | number, selectedValues?: ISelectedValues) => {
  return includes(selectedValues, value);
};

export class MultiSelect extends React.Component<IMultiSelectProps, IMultiSelectState> {
  state = {
    selected: MultiSelect.getSelectedFromValue(this.props.selectedValues),
  }

  static getSelectedFromValue = (value?: ISelectedValues) => {
    const selected = {} as Dictionary<boolean>;
    forEach(value, (item: any) => {
      selected[item] = true;
    });

    return selected;
  }

  componentWillReceiveProps(nextProps: IMultiSelectProps) {
    if (!isEqual(nextProps.selectedValues, this.props.selectedValues)) {
      this.setState({
        selected: MultiSelect.getSelectedFromValue(nextProps.selectedValues),
      });
    }
  }

  componentDidUpdate(_: any, prevState: IMultiSelectState) {
    if (!isEqual(prevState.selected, this.state.selected)) {
      if (this.props.onSelectedValuesChange) {
        this.props.onSelectedValuesChange(this.getSelectedValues())
      }
    }
  }

  updateSelectedValues = (value?: ISelectedValues) => {
    this.setState({
      selected: MultiSelect.getSelectedFromValue(value),
    })
  };

  getSelectedValues = () => {
    const result = pickBy(this.state.selected, value => value);
    return keys(result);
  }

  render() {
    return this.props.children({
      updateSelectedValues: this.updateSelectedValues,
      selectedValues: this.getSelectedValues(),
    })
  }
}
