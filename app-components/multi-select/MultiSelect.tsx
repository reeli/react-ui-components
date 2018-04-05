import {
  Dictionary,
  forEach,
  includes,
  map,
  reduce,
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
  idx: number;
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

  getSelectedFromProps({ value, options }: IMultiSelectProps) {
    const selected = {} as Dictionary<boolean>;
    forEach(options, (option: ISelectOption, idx: number) => {
      if (includes(value, option.value)) {
        selected[idx] = true;
      }
    });
    return selected;
  }

  handleChange = (currentIdx: number) => {
    this.setState({
      selected: {
        ...this.state.selected,
        [currentIdx]: !this.state.selected[currentIdx],
      },
    })
  };

  getSelectedValues = () => {
    return reduce(this.props.options, (result: any[], option: ISelectOption, idx: number) => {
      if (this.state.selected[idx]) {
        return [
          ...result,
          option.value,
        ];
      }
      return result;
    }, []);
  }

  render() {
    return map(this.props.options, (option: ISelectOption, idx) => {
      return this.props.children({
        checked: this.state.selected[idx] || false,
        selectedValues: this.getSelectedValues(),
        onChange: () => this.handleChange(idx),
        option,
        idx,
      })
    })
  }
}
