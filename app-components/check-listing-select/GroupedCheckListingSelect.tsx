import {
  Dictionary,
  forEach,
  includes,
} from 'lodash';
import * as React from 'react';
import {
  OverlayTrigger,
  Placement,
} from '../core/OverlayTrigger';
import { ICheckboxListingProps } from '../listing/CheckboxListing';
import {
  GroupedCheckboxListing,
  IGroupedCheckboxListing,
  IGroupedOption,
} from '../listing/GroupedCheckboxListing';
import {
  ISelectedValues,
  ISelectOption,
} from '../multi-select/MultiSelect';
import { SelectWithTags } from './SelectWithTags';

interface IGroupedCheckListingSelectProps {
  selectedValues?: ISelectedValues;
  placeholder?: string;
  groupedOptions: Dictionary<IGroupedOption[]>;
  getGroupTitle: IGroupedCheckboxListing['getGroupTitle'];
  onChange: ICheckboxListingProps['onChange'];
}

const pickSelectedOptionsByValue = (groupedOptions: Dictionary<IGroupedOption[]>, value: ISelectedValues = []) => {
  const selectedOptions: ISelectOption[] = [];
  forEach(groupedOptions, (options: IGroupedOption[]) => {
    forEach(options, (option: IGroupedOption) => {
      if (includes(value, option.value)) {
        selectedOptions.push({
          value: option.value,
          display: option.display,
        })
      }
    })
  });
  return selectedOptions;
};

export class GroupedCheckListingSelect extends React.Component<IGroupedCheckListingSelectProps, any> {
  render() {
    const { placeholder, groupedOptions, getGroupTitle, onChange } = this.props;
    const { selectedValues } = this.props;
    return (
      <OverlayTrigger
        content={() => (
          <GroupedCheckboxListing
            selectedValues={selectedValues}
            groupedOptions={groupedOptions}
            onChange={onChange}
            getGroupTitle={getGroupTitle}
          />
        )}
        placement={Placement.leftBottom}
        closeOnOutSide
      >
        {({ toggle }) => {
          return (
            <SelectWithTags
              selectedValues={selectedValues}
              options={pickSelectedOptionsByValue(groupedOptions, selectedValues)}
              placeholder={placeholder}
              onClick={toggle}
              onChange={onChange}
            />
          )
        }}
      </OverlayTrigger>
    )
  }
}