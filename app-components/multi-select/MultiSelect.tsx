import {
  Dictionary,
  forEach,
  keys,
  map,
  pickBy,
} from 'lodash';
import * as React from 'react';

interface ISelectOption {
  value: string | number;
  display: string | number;
}

interface IMultiSelectInnerProps {
  onChange: () => void;
  checked: boolean;
  selectedValues: any[];
  option: ISelectOption;
}

interface IMultiSelectProps {
  options: ISelectOption[];
  value?: string[] | number[];
  children: (props: IMultiSelectInnerProps) => JSX.Element | null;
}

interface IMultiSelectState {
  selected: Dictionary<boolean>
}

export class MultiSelect extends React.Component<IMultiSelectProps, IMultiSelectState> {
  state = {
    selected: this.getSelectedFromProps(this.props),
  }

  getSelectedFromProps({ value }: IMultiSelectProps) {
    const selected = {} as Dictionary<boolean>;
    forEach(value, (item: any) => {
      selected[item] = true;
    });
    return selected;
  }

  handleChange = (optionValue: number | string) => {
    this.setState({
      selected: {
        ...this.state.selected,
        [optionValue]: !this.state.selected[optionValue],
      },
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
        onChange: () => this.handleChange(option.value),
        option,
      })
    })
  }
}
