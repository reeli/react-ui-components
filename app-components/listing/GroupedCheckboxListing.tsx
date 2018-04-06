import { map, } from 'lodash';
import * as React from 'react';
import {
  IMultiSelectProps,
  ISelectOption,
} from '../multi-select/MultiSelect';
import { CheckboxListing } from './CheckboxListing';

export interface IGroupedOption extends ISelectOption {
  group: string | number;
}

export interface IGroupedCheckboxListing {
  value?: string[] | number[];
  groupedOptions: IGroupedOption[][];
  onChange: IMultiSelectProps['onChange'];
}

const pickOptionsFromGroupedOptions = (options: IGroupedOption[]) => {
  return map(options, (option) => {
    return {
      display: option.display,
      value: option.value,
    }
  });
};

export class GroupedCheckboxListing extends React.Component<IGroupedCheckboxListing, any> {
  render() {
    const { groupedOptions, value, onChange } = this.props;
    return (
      <div>
        {
          map(groupedOptions, (options: IGroupedOption[], key: number) => {
            return (
              <div key={key}>
                <div>{key}</div>
                <CheckboxListing
                  options={pickOptionsFromGroupedOptions(options)}
                  onChange={onChange}
                  value={value}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}
