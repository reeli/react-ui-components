import { filter, includes } from "lodash";
import React from "react";
import { CheckboxListing, ICheckboxListingProps } from "../listing/CheckboxListing";
import { SelectWithTags } from "./SelectWithTags";
import { ISelectOption, TSelectedValues } from "../with-multi-select/interfaces";
import { useToggle,OverlayTrigger } from "@ui/base";

interface ICheckboxSelectProps {
  selectedValues?: TSelectedValues;
  placeholder?: string;
  options: ISelectOption[];
  onChange: ICheckboxListingProps["onChange"];
}

export const CheckboxSelect: React.FC<ICheckboxSelectProps> = ({ placeholder, options, onChange, selectedValues }) => {
  const [visible, , , toggle] = useToggle();
  const selectedOptions = filter(options, (opt: ISelectOption) => includes(selectedValues, opt.value));

  return (
    <OverlayTrigger
      visible={visible}
      content={<CheckboxListing selectedValues={selectedValues} options={options} onChange={onChange} />}
    >
      <div>
        <SelectWithTags
          selectedValues={selectedValues}
          options={selectedOptions}
          placeholder={placeholder}
          onClick={toggle}
          onChange={onChange}
        />
      </div>
    </OverlayTrigger>
  );
};
