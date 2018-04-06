import { css } from 'glamor';
import * as React from 'react';
import { Input } from '../input/Input';
import { MultiSelect, } from '../multi-select/MultiSelect';

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
});

export class SelectWithTags extends React.Component<any, any> {
  render() {
    const { value, options, removeSelectedValue, placeholder, onClick } = this.props;
    return (
      <div {...triggerElementWrapperStyles}>
        <Input placeholder={value.length > 0 ? '' : placeholder} onClick={onClick} readOnly />
        <div {...tagsWrapperStyles}>
          <MultiSelect options={options} value={value}>
            {({ option }) => {
              return (
                <div key={option.value} {...css({ display: 'inline-block' })} {...tagStyles}>
                  <span>{option.display}</span>
                  <span onClick={() => removeSelectedValue(option)}>X</span>
                </div>
              )
            }}
          </MultiSelect>
        </div>
      </div>
    )
  }
}