import * as React from 'react';

interface IInputProps {
  value: string;
  onClick?: (value: any) => any;
  onChange?: (value: any) => any;
  placeholder?: string;
}

export class Input extends React.Component<IInputProps, any> {
  state = {
    open: false,
  };

  handleChange = (evt: React.ChangeEvent<any>) => {
    const value = evt.target.value;
    this.setState(
      {
        open: !this.state.open,
      },
      () => {
        const { onChange } = this.props;
        onChange && onChange(value);
      },
    );
  };

  render() {
    const { value, onClick, placeholder = '' } = this.props;
    return (
      <input
        type="text"
        value={value}
        onChange={this.handleChange}
        onClick={onClick ? onClick : v => v}
        placeholder={placeholder}
        readOnly={true}
      />
    );
  }
}
