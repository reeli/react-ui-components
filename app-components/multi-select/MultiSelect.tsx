import {
  Dictionary,
  forEach,
  isEqual,
  keys,
  map,
  pickBy,
} from 'lodash';
import * as React from 'react';

export interface ISelectOption {
  value: string | number;
  display: string | number;
}

export type ISelectedValues = string[] | number[];

interface IMultiSelectInnerProps {
  onChange: () => void;
  checked: boolean;
  selectedValues: ISelectedValues;
  option: ISelectOption;
}

export interface IMultiSelectProps {
  options: ISelectOption[];
  value?: string[] | number[];
  onChange?: (option: ISelectOption, selectedValues: ISelectedValues) => void;
  children: (props: IMultiSelectInnerProps) => JSX.Element | null;
}

interface IMultiSelectState {
  selected: Dictionary<boolean>
}

export class MultiSelect extends React.Component<IMultiSelectProps, IMultiSelectState> {
  state = {
    selected: this.getSelectedFromProps(this.props),
  }

  componentWillReceiveProps(nextProps: IMultiSelectProps) {
    if (!isEqual(nextProps.value, this.props.value)) {
      this.setState({
        selected: this.getSelectedFromProps(nextProps),
      });
    }
  }

  getSelectedFromProps({ value }: IMultiSelectProps) {
    const selected = {} as Dictionary<boolean>;
    forEach(value, (item: any) => {
      selected[item] = true;
    });
    return selected;
  }

  handleChange = (option: ISelectOption) => {
    this.setState({
      selected: {
        ...this.state.selected,
        [option.value]: !this.state.selected[option.value],
      },
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(option, this.getSelectedValues());
      }
    })
  };

  getSelectedValues = () => {
    const result = pickBy(this.state.selected, value => value);
    return keys(result);
  }

  render() {
    return map(this.props.options, (option: ISelectOption) => {
      return this.props.children({
        checked: this.state.selected[option.value] || false,
        selectedValues: this.getSelectedValues(),
        onChange: () => this.handleChange(option),
        option,
      })
    })
  }
}
