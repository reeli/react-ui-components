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
  WithMultiSelect,
} from '../with-multi-select/WithMultiSelect';

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

export class CheckboxListing extends React.Component<ICheckboxListingProps, any> {
  render() {
    const { options, onChange, selectedValues } = this.props;
    return (
      <div {...listStyles}>
        <WithMultiSelect
          selectedValues={selectedValues}
          onSelectedValuesChange={nextSelectedValues => {
            onChange(nextSelectedValues);
          }}
          options={options}
        >
          {({ selectedValues, updateSelectedValues }) => {
            return (
              <CheckList
                selectedValues={selectedValues}
                updateSelectedValues={updateSelectedValues}
                options={options}
              />
            );
          }}
        </WithMultiSelect>
      </div>
    );
  }
}
