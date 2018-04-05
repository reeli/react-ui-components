import { isEqual } from 'lodash';
import * as React from 'react';

interface ICheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string | number;
}

export class Checkbox extends React.Component<ICheckboxProps, any> {
  state = {
    value: this.props.value || false,
  };

  handleChange = () => {
    this.setState({
      value: !this.state.value,
    }, () => {
      this.props.onChange(this.state.value);
    });
  };

  componentWillReceiveProps(nextProps: ICheckboxProps) {
    if (!isEqual(nextProps.value, this.state.value)) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  render() {
    return <label>
      {this.props.label && <span>{this.props.label}</span>}
      <input
        type='checkbox'
        checked={this.state.value}
        onChange={this.handleChange}
      />
    </label>
  }
}