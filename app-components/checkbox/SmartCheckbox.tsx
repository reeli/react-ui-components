import { Checkbox } from './Checkbox';
import * as React from 'react';
import { useInput } from './useInput';

interface ISmartCheckboxProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

export function SmartCheckbox(props: ISmartCheckboxProps) {
  const { value, setValue } = useInput({
    inputValue: props.value,
  });

  return (
    <Checkbox
      value={value}
      onValueChange={val => {
        setValue(val);

        if (props.onValueChange) {
          props.onValueChange(val);
        }
      }}
    />
  );
}
