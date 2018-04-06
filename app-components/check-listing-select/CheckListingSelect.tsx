import {
  filter,
  includes,
  isEqual,
} from 'lodash';
import * as React from 'react';
import {
  OverlayTrigger,
  Placement,
} from '../core/OverlayTrigger';
import { CheckboxListing, } from '../listing/CheckboxListing';
import {
  IMultiSelectProps,
  ISelectOption,
} from '../multi-select/MultiSelect';
import { SelectWithTags } from './SelectWithTags';

interface ICheckListingSelectProps {
  onChange: IMultiSelectProps['onChange']
  value: string[] | number[];
  placeholder?: string;
  options: ISelectOption[];
}

export class CheckListingSelect extends React.Component<ICheckListingSelectProps, any> {
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
    const { placeholder, options, onChange } = this.props;
    const { value } = this.state;
    return (
      <OverlayTrigger
        content={() => (
          <CheckboxListing
            value={value}
            options={options}
            onChange={onChange}
          />
        )}
        placement={Placement.leftBottom}
        closeOnOutSide
      >
        {({ toggle }) => {
          const selectedOptions = filter(options, (opt: ISelectOption) => includes(value, opt.value));
          return (
            <SelectWithTags
              value={this.state.value}
              options={selectedOptions}
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