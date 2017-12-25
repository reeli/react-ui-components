import * as React from 'react';

interface IInputProps {
  value: string;
  onChange: (evt: React.ChangeEvent<any>) => any;
}

export class Input extends React.Component<IInputProps, any> {
  render() {
    const { value, onChange } = this.props;
    return (
      <input type='text' value={value} onChange={onChange}/>
    );
  }
}
