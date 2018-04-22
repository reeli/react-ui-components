import { Dictionary, filter, forEach, includes, isEqual, keys, pickBy } from 'lodash';
import * as React from 'react';
import { ReactNode } from 'react';

export interface ISelectOption {
  value: string | number;
  display: string | number;
  group?: string | number;
}

export type ISelectedValues = string[] | number[];

interface IMultiSelectInnerProps {
  updateSelectedValues: (value: ISelectedValues) => void;
  selectedValues?: ISelectedValues;
}

export interface IWithMultiSelectProps {
  selectedValues?: ISelectedValues;
  onSelectedValuesChange?: (selectedValues?: ISelectedValues) => void;
  children: (props: IMultiSelectInnerProps) => ReactNode;
  options: ISelectOption[];
}

interface IWithMultiSelectState {
  selected: Dictionary<boolean>;
}

export const dropValue = (value: string | number, values: ISelectedValues = []) => {
  return filter(values, (val: string | number) => val !== value) as ISelectedValues | any[];
};

export const addValue = (value: string | number, values: ISelectedValues = []) => {
  return [...values, value] as ISelectedValues | any[];
};

export const isValueInSelectedValues = (value: string | number, selectedValues?: ISelectedValues) => {
  return includes(selectedValues, value);
};

export class WithMultiSelect extends React.Component<IWithMultiSelectProps, IWithMultiSelectState> {
  state = {
    selected: WithMultiSelect.getSelectedFromValue(this.props.selectedValues),
  };

  static getSelectedFromValue = (value?: ISelectedValues) => {
    const selected = {} as Dictionary<boolean>;
    forEach(value, (item: any) => {
      selected[item] = true;
    });

    return selected;
  };

  componentWillReceiveProps(nextProps: IWithMultiSelectProps) {
    if (!isEqual(nextProps.selectedValues, this.props.selectedValues)) {
      this.setState({
        selected: WithMultiSelect.getSelectedFromValue(nextProps.selectedValues),
      });
    }
  }

  componentDidUpdate(prevProps: IWithMultiSelectProps, prevState: IWithMultiSelectState) {
    if (!isEqual(prevState.selected, this.state.selected)) {
      if (this.props.onSelectedValuesChange) {
        this.props.onSelectedValuesChange(this.getSelectedValues());
      }
    }

    if (!isEqual(prevProps.options, this.props.options)) {
      this.setState({
        selected: this.removeInvalidSelectedValues(this.state.selected, this.props.options),
      });
    }
  }

  updateSelectedValues = (value?: ISelectedValues) => {
    this.setState({
      selected: WithMultiSelect.getSelectedFromValue(value),
    });
  };

  removeInvalidSelectedValues = (selected: Dictionary<boolean>, options: ISelectOption[]) => {
    const nextSelected = {} as Dictionary<boolean>;
    forEach(options, (option: ISelectOption) => {
      if (selected[option.value]) {
        nextSelected[option.value] = selected[option.value];
      }
    });
    return nextSelected;
  };

  getSelectedValues = () => {
    const result = pickBy(this.state.selected, value => value) as Dictionary<boolean>;
    return keys(result);
  };

  render() {
    return this.props.children({
      updateSelectedValues: this.updateSelectedValues,
      selectedValues: this.getSelectedValues(),
    });
  }
}
