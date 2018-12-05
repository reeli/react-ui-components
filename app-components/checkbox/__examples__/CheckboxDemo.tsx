import * as React from 'react';
import { Checkbox } from '../Checkbox';
import { SmartCheckbox } from '../SmartCheckbox';

export class CheckboxDemo extends React.Component<any, any> {
  state = {
    checked1: false,
    checked2: false,
  };

  render() {
    return (
      <div>
        <h2>Dumb Checkbox</h2>
        <Checkbox />
        <Checkbox
          value={this.state.checked1}
          onValueChange={() => {
            this.setState({
              checked1: !this.state.checked1,
            });
          }}
        />
        <h2>Smart Checkbox</h2>
        <SmartCheckbox />
        <SmartCheckbox
          value={this.state.checked2}
          onValueChange={() => {
            this.setState({
              checked2: !this.state.checked2,
            });
          }}
        />
      </div>
    );
  }
}
