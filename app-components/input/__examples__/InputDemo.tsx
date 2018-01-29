import * as React from 'react';
import { Input } from '../Input';

export class InputDemo extends React.Component<any, any> {
  state = {
    value: '',
  };

  handleChange = (value: string) => {
    this.setState({
      value,
    })
  };

  render() {
    return (
      <Input
        value={this.state.value}
        placeholder='placeholder...'
        onChange={this.handleChange}
      />
    );
  }
}
