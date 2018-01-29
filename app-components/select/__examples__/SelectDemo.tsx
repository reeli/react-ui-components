import * as React from 'react';
import { IListingItem } from '../../listing/Listing';
import { Select } from '../Select';

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

export class SelectDemo extends React.Component<any, any> {
  state = {
    value: 'jessy',
  };

  handleItemClick = (_: any, item: IListingItem) => {
    this.setState({
      value: item.value ? item.display : '',
    });
  };

  render() {
    return (
      <Select
        value={this.state.value}
        data={data}
        onItemClick={this.handleItemClick}
        placeholder="Type you name here..."
      />
    );
  }
}
