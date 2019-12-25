import { Dictionary, groupBy, map } from "lodash";
import React from "react";

import { CheckboxListing, ICheckboxListingProps } from "./CheckboxListing";
import { ISelectOption, TSelectedValues } from "../with-multi-select/interfaces";
import { useMultiSelect } from "../with-multi-select/useMultiSelect";

export interface IGroupedCheckboxListing {
  selectedValues?: TSelectedValues;
  options: ISelectOption[];
  getGroupTitle: (key: string | number) => string | number;
  onChange: ICheckboxListingProps["onChange"];
}

export const GroupedCheckboxListing = (props: IGroupedCheckboxListing) => {
  const { options, selectedValues, getGroupTitle, onChange } = props;
  const multiSelect = useMultiSelect({
    selectedValues,
    options,
  });

  const groups = groupBy(options, "group") as Dictionary<ISelectOption[]>;

  return (
    <>
      {map(groups, (groupOptions: ISelectOption[], key: string | number) => (
        <div key={key}>
          <div>{getGroupTitle(key)}</div>
          <CheckboxListing selectedValues={multiSelect.selectedValues} options={groupOptions} onChange={onChange} />
        </div>
      ))}
    </>
  );
};
