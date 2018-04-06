import * as React from 'react';
import { ISelectOption } from '../../multi-select/MultiSelect';
import { CascadingSelect } from '../CascadingSelect';

const data = [
  {
    display: '四川省',
    value: '1',
  },
  {
    display: '河北省',
    value: '2',
  },
  {
    display: '海南省',
    value: '3',
  },
];

export class CascadingSelectDemo extends React.Component<any, any> {
  state = {
    value: [],
  };

  handleChange = (_: ISelectOption, selectedValues: string[] | number[]) => {
    console.log(selectedValues, 'selectedValues');
    this.setState({
      value: selectedValues,
    });
  };

  render() {
    return (
      <CascadingSelect
        value={this.state.value}
        options={data}
        onChange={this.handleChange}
        placeholder="Type you name here..."
      />
    );
  }
}
