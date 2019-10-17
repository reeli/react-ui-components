import { filter, includes } from "lodash";
import React from "react";
import { OverlayTrigger, Placement } from "../core/OverlayTrigger";
import { CheckboxListing, ICheckboxListingProps } from "../listing/CheckboxListing";
import { SelectWithTags } from "./SelectWithTags";
import { ISelectOption, TSelectedValues } from "../with-multi-select/interfaces";

interface ICheckboxSelectProps {
  selectedValues?: TSelectedValues;
  placeholder?: string;
  options: ISelectOption[];
  onChange: ICheckboxListingProps["onChange"];
}

export class CheckboxSelect extends React.Component<ICheckboxSelectProps, any> {
  render() {
    const { placeholder, options, onChange, selectedValues } = this.props;
    return (
      <OverlayTrigger
        content={() => <CheckboxListing selectedValues={selectedValues} options={options} onChange={onChange} />}
        placement={Placement.leftBottom}
        closeOnOutSide
      >
        {({ toggle }) => {
          const selectedOptions = filter(options, (opt: ISelectOption) => includes(selectedValues, opt.value));
          return (
            <SelectWithTags
              selectedValues={selectedValues}
              options={selectedOptions}
              placeholder={placeholder}
              onClick={toggle}
              onChange={onChange}
            />
          );
        }}
      </OverlayTrigger>
    );
  }
}
