import { css } from 'glamor';
import { isEqual } from 'lodash';
import * as React from 'react';

interface ICheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string | number;
}

const inputWrapper = css({
  position: 'relative',
});

const inputStyles = css({
  width: 0,
  height: 0,
  visibility: 'hidden',
});

export class Checkbox extends React.Component<ICheckboxProps, any> {
  state = {
    value: this.props.value || false,
  };

  handleChange = () => {
    this.setState({
      value: !this.state.value,
    }, () => {
      this.props.onChange(this.state.value);
    });
  };

  componentWillReceiveProps(nextProps: ICheckboxProps) {
    if (!isEqual(nextProps.value, this.state.value)) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  render() {
    return <label>
      {this.props.label && <span>{this.props.label}</span>}
      <div {...inputWrapper}>
        {this.state.value
          ? <svg fill="#00a862" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          : <svg xmlSpace="preserve" x="0" y="0" fill="#00a862" height="24" viewBox="0 0 24 24" width="24"
                 xmlns="http://www.w3.org/2000/svg">
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        }
        <input
          type='checkbox'
          checked={this.state.value}
          onChange={this.handleChange}
          {...inputStyles}
        />
      </div>
    </label>
  }
}