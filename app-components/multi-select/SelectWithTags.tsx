import {css} from 'glamor';
import {isEmpty, map} from 'lodash';
import * as React from 'react';
import {Input} from '../input/Input';
import {useMultiSelect} from '../with-multi-select/useMultiSelect';
import {ISelectedValues, ISelectOption} from '../with-multi-select/interfaces';
import {dropValue} from "../with-multi-select/utils";

const tagStyles = css({
  display: 'inline-block',
  border: '1px solid #ccc',
  marginRight: '.5rem',
  padding: '0 .5rem',
});

const triggerElementWrapperStyles = css({
  position: 'relative',
});

const tagsWrapperStyles = css({
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'inline-block',
});

interface ISelectWithTagsProps {
  selectedValues?: ISelectedValues;
  placeholder?: string;
  onChange: (selectedValues?: ISelectedValues) => void;
  onClick?: () => void;
  options: ISelectOption[];
}

export function SelectWithTags(props: ISelectWithTagsProps) {
  const { options, placeholder, selectedValues, onChange, onClick } = props;
  const multiSelect = useMultiSelect({
    selectedValues,
    onSelectedValuesChange: onChange,
  });
  return (
    <div {...triggerElementWrapperStyles}>
      <Input placeholder={!isEmpty(selectedValues) ? '' : placeholder} onClick={onClick} readOnly />
      <div {...tagsWrapperStyles}>
        {map(options, (option: ISelectOption) => {
          return (
            <div key={option.value} {...tagStyles}>
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
}
