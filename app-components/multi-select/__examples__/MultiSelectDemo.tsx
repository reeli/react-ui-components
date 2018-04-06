import {
  includes,
  map,
} from 'lodash';
import * as React from 'react';
import { Checkbox } from '../../checkbox/Checkbox';
import {
  addValue,
  dropValue,
  MultiSelect,
} from '../MultiSelect';

const options = [
  {
    value: 'cat',
    display: 'Cat',
  },
  {
    value: 'dog',
    display: 'Dog',
  },
  {
    value: 'bird',
    display: 'bird',
  },
];

export class MultiSelectDemo extends React.Component<any, any> {
  state = {
    values: ['cat', 'dog'],
  }

  render() {
    return (
      <MultiSelect selectedValues={this.state.values} options={options}>
        {({ selectedValues }) => {
          console.log(selectedValues, 'selectedValues')
          return map(options, (option) => {
            const isChecked = includes(this.state.values, option.value);
            return <Checkbox
              key={option.value}
              value={isChecked}
              onChange={() => {
                this.setState({
                  values: isChecked ? dropValue(option.value, selectedValues) : addValue(option.value, selectedValues),
                })
              }}
              label={option.display}
            />
          })
        }}
      </MultiSelect>
    )
  }
}
