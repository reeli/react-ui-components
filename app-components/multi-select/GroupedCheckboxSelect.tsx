import { filter, includes } from "lodash";
import React from "react";
import { OverlayTrigger } from "../core/OverlayTrigger";
import { ICheckboxListingProps } from "../listing/CheckboxListing";
import { GroupedCheckboxListing, IGroupedCheckboxListing } from "../listing/GroupedCheckboxListing";
import { SelectWithTags } from "./SelectWithTags";
import { ISelectOption, TSelectedValues } from "../with-multi-select/interfaces";
import { useToggle } from "app-components/core";

interface IGroupedCheckboxSelectProps {
  selectedValues?: TSelectedValues;
  placeholder?: string;
  options: ISelectOption[];
  getGroupTitle: IGroupedCheckboxListing["getGroupTitle"];
  onChange: ICheckboxListingProps["onChange"];
}

const pickSelectedOptionsByValue = (options: ISelectOption[], value: TSelectedValues = []) => {
  return filter(options, (option: ISelectOption) => {
    return includes(value, option.value);
  });
};

export const GroupedCheckboxSelect: React.FC<IGroupedCheckboxSelectProps> = ({
  placeholder,
  options,
  getGroupTitle,
  onChange,
  selectedValues,
}) => {
  const [, , , toggle] = useToggle();
  return (
    <OverlayTrigger
      content={
        <GroupedCheckboxListing
          selectedValues={selectedValues}
          options={options}
          onChange={onChange}
          getGroupTitle={getGroupTitle}
        />
      }
    >
      <div>
        <SelectWithTags
          selectedValues={selectedValues}
          options={pickSelectedOptionsByValue(options, selectedValues)}
          placeholder={placeholder}
          onClick={toggle}
          onChange={onChange}
        />
      </div>
    </OverlayTrigger>
  );
};
