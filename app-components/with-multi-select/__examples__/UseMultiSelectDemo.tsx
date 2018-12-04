import { map } from 'lodash';
import React from 'react';
import { Checkbox } from '../../checkbox/Checkbox';
import { useMultiSelect } from '../useMultiSelect';

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

const initialValues = ['cat', 'dog'];

export const UseMultiSelectDemo = () => {
  const { selectedState, toggle } = useMultiSelect({
    selectedValues: initialValues,
    onSelectedValuesChange: values => {
      console.log(values, 'onchange');
    },
  });

  return map(options, option => {
    return (
      <Checkbox
        key={option.value}
        value={selectedState[option.value]}
        onChange={() => {
          toggle(option.value);
        }}
        label={option.display}
      />
    );
  });
};
