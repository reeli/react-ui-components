import { filter, isEmpty, map } from "lodash";
import React from "react";
import { Input } from "../input/Input";
import { useMultiSelect } from "../with-multi-select/useMultiSelect";
import { ISelectOption, TSelectedValues } from "../with-multi-select/interfaces";
import { css } from "@emotion/react";

const tagStyles = css({
  display: "inline-block",
  border: "1px solid #ccc",
  marginRight: ".5rem",
  padding: "0 .5rem",
});

const triggerElementWrapperStyles = css({
  position: "relative",
});

const tagsWrapperStyles = css({
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
  display: "inline-block",
});

interface ISelectWithTagsProps {
  selectedValues?: TSelectedValues;
  placeholder?: string;
  onChange: (selectedValues?: TSelectedValues) => void;
  onClick?: () => void;
  options: ISelectOption[];
}

export const dropValue = (value: string | number, values: TSelectedValues = []) => {
  return filter(values, (val: string | number) => val !== value) as TSelectedValues | any[];
};

export const SelectWithTags: React.FC<ISelectWithTagsProps> = ({
  options,
  placeholder,
  selectedValues,
  onChange,
  onClick,
}) => {
  const multiSelect = useMultiSelect({
    selectedValues,
    options,
    onSelectedValuesChange: onChange,
  });

  return (
    <div css={triggerElementWrapperStyles}>
      <Input placeholder={!isEmpty(selectedValues) ? "" : placeholder} onClick={onClick} readOnly name={""} />
      <div css={tagsWrapperStyles}>
        {map(options, (option: ISelectOption) => {
          return (
            <div key={option.value} css={tagStyles}>
              <span>{option.display}</span>
              <span
                onClick={() => {
                  multiSelect.updateSelectedValues(dropValue(option.value, multiSelect.selectedValues));
                }}
              >
                X
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
