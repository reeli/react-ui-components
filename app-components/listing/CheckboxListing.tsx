import { css } from 'glamor';
import { map } from 'lodash';
import * as React from 'react';
import { Checkbox } from '../checkbox/Checkbox';
import { isValueInSelectedValues, useMultiSelect } from '../with-multi-select/useMultiSelect';
import { ISelectedValues, ISelectOption } from '../with-multi-select/interfaces';
import { addValue, dropValue } from '../with-multi-select/utils';

export interface ICheckboxListingProps {
  selectedValues?: ISelectedValues;
  options: ISelectOption[];
  onChange: (value?: ISelectedValues) => void;
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

interface ICheckListProps {
  options: ISelectOption[];
  selectedValues?: ISelectedValues;
  updateSelectedValues: (value: ISelectedValues) => void;
}

export const CheckList = ({ options, selectedValues, updateSelectedValues }: ICheckListProps) => (
  <>
    {map(options, option => {
      const isChecked = isValueInSelectedValues(option.value, selectedValues);
      return (
        <div key={option.value} {...listItemStyles}>
          <Checkbox
            value={isChecked}
            onChange={() => {
              isChecked
                ? updateSelectedValues(dropValue(option.value, selectedValues))
                : updateSelectedValues(addValue(option.value, selectedValues));
            }}
            label={option.display}
          />
        </div>
      );
    })}
  </>
);

export function CheckboxListing(props: ICheckboxListingProps) {
  const { options, onChange, selectedValues } = props;
  const multiSelect = useMultiSelect({
    selectedValues,
    onSelectedValuesChange: onChange,
  });
  return (
    <div {...listStyles}>
      <CheckList
        selectedValues={multiSelect.selectedValues}
        updateSelectedValues={multiSelect.updateSelectedValues}
        options={options}
      />
    </div>
  );
}
