import {
  Dictionary,
  groupBy,
  map,
} from 'lodash';
import * as React from 'react';

import {
  ISelectedValues,
  ISelectOption,
  WithMultiSelect,
} from '../with-multi-select/WithMultiSelect';
import {
  CheckList,
  ICheckboxListingProps,
} from './CheckboxListing';

export interface IGroupedCheckboxListing {
  selectedValues?: ISelectedValues;
  options: ISelectOption[];
  getGroupTitle: (key: string | number) => string | number;
  onChange: ICheckboxListingProps['onChange'];
}

export class GroupedCheckboxListing extends React.Component<IGroupedCheckboxListing, any> {
  render() {
    const { options, selectedValues, getGroupTitle, onChange } = this.props;
    return (
      <WithMultiSelect
        selectedValues={selectedValues}
        onSelectedValuesChange={(nextSelectedValues) => {
          onChange(nextSelectedValues);
        }}
        options={options}
      >
        {() => {
          const groups = groupBy(options, 'group') as Dictionary<ISelectOption[]>;
          return map(groups, (groupOptions: ISelectOption[], key: string | number) => {
            return (
              <div key={key}>
                <div>{getGroupTitle(key)}</div>
                <CheckList
                  selectedValues={selectedValues}
                  options={groupOptions}
                  updateSelectedValues={onChange}
                />
              </div>
            );
          })
        }}
      </WithMultiSelect>
    );
  }
}
