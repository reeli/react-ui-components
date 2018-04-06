import { css } from 'glamor';
import * as React from 'react';
import { MultiSelect } from '../multi-select/MultiSelect';

const tagStyles = css({
  display: 'inline-block',
  border: '1px solid #ccc',
  marginRight: '.5rem',
  padding: '0 .5rem',
});

export class SelectWithTags extends React.Component<any, any> {
  render() {
    const { value, options, removeSelectedValue } = this.props;
    return (
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
    )
  }
}