import { css } from 'glamor';
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

const listStyles = css({
  margin: 0,
  padding: '1rem 0 0',
});

const listItemStyles = css({
  listStyle: 'none',
  marginTop: '.5rem',
  '&:first-child': {
    marginTop: 0,
  },
});

export class CheckboxListing extends React.Component<ICheckboxListingProps, any> {
  render() {
    const { options, value, onChange } = this.props;
    return (
      <ul {...listStyles}>
        <MultiSelect options={options} value={value} onChange={onChange}>
          {({ checked, onChange, option }) => {
            return <li key={option.value} {...listItemStyles}>
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
