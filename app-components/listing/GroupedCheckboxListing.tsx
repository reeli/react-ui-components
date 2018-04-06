import {
  Dictionary,
  map,
} from 'lodash';
import * as React from 'react';
import {
  ISelectedValues,
  ISelectOption,
} from '../multi-select/MultiSelect';
import {
  CheckboxListing,
  ICheckboxListingProps,
} from './CheckboxListing';

export interface IGroupedOption extends ISelectOption {
  group: string | number;
}

export interface IGroupedCheckboxListing {
  selectedValues?: ISelectedValues;
  groupedOptions: Dictionary<IGroupedOption[]>;
  getGroupTitle: (key: string | number) => string | number;
  onChange: ICheckboxListingProps['onChange'];
}

const pickOptionsFromGroupedOptions = (options: IGroupedOption[]) => {
  return map(options, (option) => {
    return {
      display: option.display,
      value: option.value,
    }
  });
};

export class GroupedCheckboxListing extends React.Component<IGroupedCheckboxListing, any> {
  render() {
    const { groupedOptions, selectedValues, getGroupTitle, onChange } = this.props;
    return (
      map(groupedOptions, (options: IGroupedOption[], key: string | number) => {
        return (
          <div key={key}>
            <div>{getGroupTitle(key)}</div>
            <CheckboxListing
              options={pickOptionsFromGroupedOptions(options)}
              selectedValues={selectedValues}
              onChange={onChange}
            />
          </div>
        );
      })
    );
  }
}
