import { css } from 'glamor';
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

interface ICascadingSelectProps {
  onChange: IMultiSelectProps['onChange']
  value: string[] | number[];
  placeholder?: string;
  options: ISelectOption[];
}

export class CascadingSelect extends React.Component<ICascadingSelectProps, any> {
  state = {
    value: this.props.value,
  }

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
    console.log(value, 'value')
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
        {({ open }) => {
          const selectedOptions = filter(options, (opt: ISelectOption) => includes(value, opt.value));
          return <div {...css({ position: 'relative' })}>
            <div onClick={open}>{placeholder}</div>
            <div {...css({ position: 'absolute', top: 0, right: 0 })}>
              <SelectWithTags
                options={selectedOptions}
                value={value}
                removeSelectedValue={(option: ISelectOption) => {
                  this.setState({
                    value: filter(value, (item: string | number) => {
                      return item !== option.value
                    }),
                  });
                }}
              />
            </div>
          </div>
        }}
      </OverlayTrigger>
    )
  }
}