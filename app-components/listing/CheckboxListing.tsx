import { css } from 'glamor';
import { map } from 'lodash';
import * as React from 'react';
import { Checkbox } from '../checkbox/Checkbox';
import {
  addValue,
  dropValue,
  ISelectedValues,
  ISelectOption,
  isValueInSelectedValues,
  MultiSelect,
} from '../multi-select/MultiSelect';

export interface ICheckboxListingProps {
  selectedValues?: ISelectedValues;
  options: ISelectOption[];
  onChange: (value?: ISelectedValues) => void;
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
    const { options, onChange, selectedValues } = this.props;
    return (
      <ul {...listStyles}>
        <MultiSelect selectedValues={selectedValues} onSelectedValuesChange={(nextSelectedValues) => {
          onChange(nextSelectedValues);
        }}>
          {({ selectedValues, updateSelectedValues }) => {
            return map(options, (option) => {
              const isChecked = isValueInSelectedValues(option.value, selectedValues);
              return (
                <li key={option.value} {...listItemStyles}>
                  <Checkbox
                    value={isChecked}
                    onChange={() => {
                      isChecked
                        ? updateSelectedValues(dropValue(option.value, selectedValues))
                        : updateSelectedValues(addValue(option.value, selectedValues));
                    }}
                    label={option.display}
                  />
                </li>
              );
            })
          }}
        </MultiSelect>
      </ul>
    );
  }
}
