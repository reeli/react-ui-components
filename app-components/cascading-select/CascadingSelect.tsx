import * as React from 'react';
import {
  OverlayTrigger,
  Placement,
} from '../core/OverlayTrigger';
import { Input } from '../input/Input';
import { CheckboxListing, } from '../listing/CheckboxListing';
import {
  IMultiSelectProps,
  ISelectOption,
} from '../multi-select/MultiSelect';

interface ICascadingSelectProps {
  onChange: IMultiSelectProps['onChange']
  value: string[] | number[];
  placeholder?: string;
  options: ISelectOption[];
}

export class CascadingSelect extends React.Component<ICascadingSelectProps, any> {
  render() {
    const { placeholder, options, value, onChange } = this.props;
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
          return <Input value='test' placeholder={placeholder} onClick={open} readOnly={true} />;
        }}
      </OverlayTrigger>
    )
  }
}