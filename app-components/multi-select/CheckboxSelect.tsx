import { filter, includes } from "lodash";
import React from "react";
import { CheckboxListing, ICheckboxListingProps } from "../listing/CheckboxListing";
import { SelectWithTags } from "./SelectWithTags";
import { ISelectOption, TSelectedValues } from "../with-multi-select/interfaces";
import { OverlayTrigger } from "app-components/core/OverlayTrigger";
import { useToggle } from "app-components/core";

interface ICheckboxSelectProps {
  selectedValues?: TSelectedValues;
  placeholder?: string;
  options: ISelectOption[];
  onChange: ICheckboxListingProps["onChange"];
}

export const CheckboxSelect: React.FC<ICheckboxSelectProps> = ({ placeholder, options, onChange, selectedValues }) => {
  const [, , , toggle] = useToggle();
  const selectedOptions = filter(options, (opt: ISelectOption) => includes(selectedValues, opt.value));

  return (
    <OverlayTrigger content={<CheckboxListing selectedValues={selectedValues} options={options} onChange={onChange} />}>
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
