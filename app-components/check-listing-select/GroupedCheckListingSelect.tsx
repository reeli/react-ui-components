import {
  Dictionary,
  filter,
  forEach,
  includes,
  isEqual,
} from 'lodash';
import * as React from 'react';
import {
  OverlayTrigger,
  Placement,
} from '../core/OverlayTrigger';
import {
  GroupedCheckboxListing,
  IGroupedCheckboxListing,
  IGroupedOption,
} from '../listing/GroupedCheckboxListing';
import {
  IMultiSelectProps,
  ISelectOption,
} from '../multi-select/MultiSelect';
import { SelectWithTags } from './SelectWithTags';

interface IGroupedCheckListingSelectProps {
  onChange: IMultiSelectProps['onChange']
  value: string[] | number[];
  placeholder?: string;
  groupedOptions: Dictionary<IGroupedOption[]>;
  getGroupTitle: IGroupedCheckboxListing['getGroupTitle']
}

const pickSelectedOptionsByValue = (groupedOptions: Dictionary<IGroupedOption[]>, value: string[] | number[]) => {
  const selectedOptions: ISelectOption[] = [];
  forEach(groupedOptions, (options: IGroupedOption[]) => {
    forEach(options, (option: IGroupedOption) => {
      if (includes(value, option.value)) {
        selectedOptions.push({
          value: option.value,
          display: option.display,
        })
      }
    })
  });
  return selectedOptions;
};

export class GroupedCheckListingSelect extends React.Component<IGroupedCheckListingSelectProps, any> {
  state = {
    value: this.props.value,
  };

  componentWillReceiveProps(nextProps: any) {
    if (!isEqual(nextProps.value, this.state.value)) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  render() {
    const { placeholder, groupedOptions, onChange, getGroupTitle } = this.props;
    return (
      <OverlayTrigger
        content={() => (
          <GroupedCheckboxListing
            value={this.state.value}
            groupedOptions={groupedOptions}
            onChange={onChange}
            getGroupTitle={getGroupTitle}
          />
        )}
        placement={Placement.leftBottom}
        closeOnOutSide
      >
        {({ toggle }) => {
          return (
            <SelectWithTags
              value={this.state.value}
              options={pickSelectedOptionsByValue(groupedOptions, this.state.value)}
              removeSelectedValue={(option: ISelectOption) => {
                this.setState({
                  value: filter(this.state.value, (item: string | number) => {
                    return item !== option.value
                  }),
                });
              }}
              placeholder={placeholder}
              onClick={toggle}
            />
          )
        }}
      </OverlayTrigger>
    )
  }
}