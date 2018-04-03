import * as React from 'react';

interface ICheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export class Checkbox extends React.Component<ICheckboxProps, any> {
  state = {
    value: this.props.value,
  };

  handleChange = () => {
    this.props.onChange(this.state.value);
  }

  render() {
    return <input
      type='checkbox'
      checked={this.state.value}
      onChange={this.handleChange}
    />
  }
}