import { includes, map } from 'lodash';
import React, { useState } from 'react';
import { Checkbox } from '../../checkbox/Checkbox';
import { useMultiSelect } from '../useMultiSelect';
import { addValue, dropValue } from '../utils';

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
  const [values, setValues] = useState(initialValues);
  const { selectedValues } = useMultiSelect({
    selectedValues: values,
    onSelectedValuesChange: values => {
      console.log(values, 'onchange');
    },
  });

  return map(options, option => {
    const isChecked = includes(values, option.value);
    return (
      <Checkbox
        key={option.value}
        value={isChecked}
        onChange={() => {
          const nextValues = isChecked
            ? dropValue(option.value, selectedValues)
            : addValue(option.value, selectedValues);
          setValues(nextValues);
        }}
        label={option.display}
      />
    );
  });
};
