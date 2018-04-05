import { css } from 'glamor';
import * as React from 'react';
import { MultiSelect } from '../multi-select/MultiSelect';

export class SelectWithTags extends React.Component<any, any> {
  render() {
    const { value, options, removeSelectedValue } = this.props;
    return (
      <div>
        <MultiSelect options={options} value={value}>
          {({ option }) => {
            return <div key={option.value} {...css({ display: 'inline-block' })}>
              <span>{option.value}</span>
              <span onClick={() => removeSelectedValue(option)}>X</span>
            </div>
          }}
        </MultiSelect>
      </div>
    )
  }
}