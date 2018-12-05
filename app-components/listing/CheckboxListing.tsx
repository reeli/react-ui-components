import { css } from 'glamor';
import { map } from 'lodash';
import * as React from 'react';
import { Checkbox } from '../checkbox/Checkbox';
import { useMultiSelect } from '../with-multi-select/useMultiSelect';
import { ISelectOption, TSelectedValues } from '../with-multi-select/interfaces';

export interface ICheckboxListingProps {
  selectedValues?: TSelectedValues;
  options: ISelectOption[];
  onChange: (value?: TSelectedValues) => void;
}

const listStyles = css({
  margin: 0,
});

const listItemStyles = css({
  listStyle: 'none',
  marginTop: '.5rem',
  '&:first-child': {
    marginTop: 0,
  },
});

export function CheckboxListing(props: ICheckboxListingProps) {
  const { options, onChange, selectedValues } = props;
  const { selectedState, toggle } = useMultiSelect({
    selectedValues,
    onSelectedValuesChange: onChange,
    options,
  });
  return (
    <div {...listStyles}>
      <>
        {map(options, option => {
          return (
            <div key={option.value} {...listItemStyles}>
              <Checkbox
                value={selectedState[option.value]}
                onChange={() => {
                  toggle(option.value);
                }}
                label={option.display}
              />
            </div>
          );
        })}
      </>
    </div>
  );
}
