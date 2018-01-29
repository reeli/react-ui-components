import * as React from 'react';

interface IInputProps {
  value: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>, value: any) => any;
  type?: 'text' | 'number' | 'checkbox' | 'radio',
  onClick?: (evt: React.MouseEvent<HTMLInputElement>, value: any) => any;
  placeholder?: string;
  readOnly?: boolean;
}

export class Input extends React.Component<IInputProps, any> {
  handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(evt, evt.target.value);
    }
  };

  handleClick = (evt: React.MouseEvent<HTMLInputElement>) => {
    if (this.props.onClick) {
      const value = (evt.target as HTMLInputElement).value;
      this.props.onClick(evt, value);
    }
  };

  render() {
    const { type = 'text', value, placeholder = '', readOnly = false } = this.props;
    return (
      <input
        type={type}
        value={value}
        onChange={this.handleChange}
        onClick={this.handleClick}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    );
  }
}
