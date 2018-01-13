import * as React from 'react';
import { Listing } from '../../listing/Listing';
import { Portal } from '../../portal/Portal';
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

  handleItemClick = (e: any, value: string | boolean, close: () => void) => {
    this.setState({
      value,
    }, () => {
      close(e);
    });
  };

  render() {
    return (
      <Portal
        triggerOn={({ toggle }) => {
          return <Input value={this.state.value} placeholder="Type username here..." onClick={toggle}/>;
        }}
        onOutSideClick
      >
        {({ close }) => <Listing data={data} onItemClick={(e, value) => this.handleItemClick(e, value, close)}/>}
      </Portal>
    );
  }
}
