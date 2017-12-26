import * as React from 'react';

interface IInputProps {
  value: string;
  onChange?: (value: string) => any;
  placeholder?: string;
}

export class Input extends React.Component<IInputProps, any> {
  state = {
    open: false,
  };

  handleClick = (evt: React.ChangeEvent<any>) => {
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
    const { value, placeholder = '' } = this.props;
    return <input type="text" value={value} onClick={this.handleClick} placeholder={placeholder} readOnly={true} />;
  }
}
