import * as React from 'react';
import { Checkbox } from '../checkbox/Checkbox';
import {
  IMultiSelectProps,
  ISelectOption,
  MultiSelect,
} from '../multi-select/MultiSelect';

export interface ICheckboxListingProps {
  value?: string[] | number[];
  options: ISelectOption[];
  onChange: IMultiSelectProps['onChange'];
}

export class CheckboxListing extends React.Component<ICheckboxListingProps, any> {
  render() {
    const { options, value, onChange } = this.props;
    return (
      <ul>
        <MultiSelect options={options} value={value} onChange={onChange}>
          {({ checked, onChange, option }) => {
            return <li key={option.value}>
              <Checkbox
                value={checked}
                onChange={onChange}
                label={option.display}
              />
            </li>
          }}
        </MultiSelect>
      </ul>
    );
  }
}
