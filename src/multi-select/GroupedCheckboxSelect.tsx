import { filter, includes } from "lodash";
import React from "react";
import { OverlayTrigger } from "src/core/components/OverlayTrigger";
import { ICheckboxListingProps } from "../listing/CheckboxListing";
import { GroupedCheckboxListing, IGroupedCheckboxListing } from "../listing/GroupedCheckboxListing";
import { SelectWithTags } from "./SelectWithTags";
import { ISelectOption, TSelectedValues } from "../with-multi-select/interfaces";
import { useToggle } from "src/core";

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
  const [visible, , , toggle] = useToggle();
  return (
    <OverlayTrigger
      visible={visible}
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
