import * as React from 'react';
import { Checkbox } from '../../checkbox/Checkbox';
import { MultiSelect } from '../MultiSelect';

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
  render() {
    return (
      <MultiSelect options={options} value={['cat', 'dog']}>
        {({ checked, onChange, option, idx, selectedValues }) => {
          console.log(selectedValues, 'selectedValues')
          return <Checkbox
            key={idx}
            value={checked}
            onChange={onChange}
            label={option.display}
          />
        }}
      </MultiSelect>
    )
  }
}
