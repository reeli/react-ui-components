import { css } from 'glamor';
import {
  isEmpty,
  map,
} from 'lodash';
import * as React from 'react';
import { Input } from '../input/Input';
import {
  dropValue,
  ISelectedValues,
  ISelectOption,
  MultiSelect,
} from '../multi-select/MultiSelect';

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

interface ISelectWithTagsState {
}

export class SelectWithTags extends React.Component<ISelectWithTagsProps, ISelectWithTagsState> {
  render() {
    const { options, placeholder, selectedValues, onChange, onClick } = this.props;
    return (
      <div {...triggerElementWrapperStyles}>
        <Input placeholder={!isEmpty(selectedValues) ? '' : placeholder} onClick={onClick} readOnly />
        <div {...tagsWrapperStyles}>
          <MultiSelect
            selectedValues={selectedValues}
            onSelectedValuesChange={(nextSelectedValues) => {
              onChange(nextSelectedValues);
            }}
            options={options}
          >
            {({ selectedValues, updateSelectedValues }) => {
              return map(options, (option: ISelectOption) => {
                return (
                  <div key={option.value} {...tagStyles}>
                    <span>{option.display}</span>
                    <span onClick={() => {
                      updateSelectedValues(dropValue(option.value, selectedValues));
                    }}>X</span>
                  </div>
                )
              })
            }}
          </MultiSelect>
        </div>
      </div>
    )
  }
}