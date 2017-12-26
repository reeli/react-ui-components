import * as React from 'react';
import { Listing } from '../../listing/Listing';
import { Input } from '../Input';

const data = [
  {
    display: 'von',
    value: '',
  },
  {
    display: 'tony',
    value: '1',
  },
  {
    display: 'jessy',
    value: '2',
  },
  {
    display: 'luca',
    value: '3',
  },
];

export class InputDemo extends React.Component<any, any> {
  state = {
    value: '',
  };

  handleItemClick = (value: string | boolean) => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <div>
        <Input value={this.state.value} placeholder="Type username here..." />
        <Listing data={data} onItemClick={this.handleItemClick} />
      </div>
    );
  }
}
