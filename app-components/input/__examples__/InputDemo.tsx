import * as React from 'react';
import { Input } from '../Input';

export class InputDemo extends React.Component<any, any> {
  handleChange = () => {
    console.log('handleChange');
  }

  render() {
    return <Input value='name' onChange={this.handleChange}/>;
  }
}
