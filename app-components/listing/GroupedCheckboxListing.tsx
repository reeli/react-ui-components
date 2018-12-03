import { Dictionary, groupBy, map } from 'lodash';
import * as React from 'react';

import { CheckList, ICheckboxListingProps } from './CheckboxListing';
import { ISelectedValues, ISelectOption } from '../with-multi-select/interfaces';
import { useMultiSelect } from '../with-multi-select/useMultiSelect';

export interface IGroupedCheckboxListing {
  selectedValues?: ISelectedValues;
  options: ISelectOption[];
  getGroupTitle: (key: string | number) => string | number;
  onChange: ICheckboxListingProps['onChange'];
}

export const GroupedCheckboxListing = (props: IGroupedCheckboxListing): React.ReactNode => {
  const { options, selectedValues, getGroupTitle, onChange } = props;
  const multiSelect = useMultiSelect({
    selectedValues,
  });

  const groups = groupBy(options, 'group') as Dictionary<ISelectOption[]>;

  return map(groups, (groupOptions: ISelectOption[], key: string | number) => (
    <div key={key}>
      <div>{getGroupTitle(key)}</div>
      <CheckList selectedValues={multiSelect.selectedValues} options={groupOptions} updateSelectedValues={onChange} />
    </div>
  ));
};
