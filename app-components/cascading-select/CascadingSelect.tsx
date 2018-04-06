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
import { Input } from '../input/Input';
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

const triggerElementWrapperStyles = css({
  position: 'relative',
});

const tagsWrapperStyles = css({
  position: 'absolute',
  bottom: 0,
  left: 0,
});

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
          return <div {...triggerElementWrapperStyles}>
            <Input placeholder={value.length > 0 ? '' : placeholder} onClick={toggle} readOnly />
            <div {...tagsWrapperStyles}>
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