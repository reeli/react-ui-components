import React from "react";
import { Picker } from "src/picker/Picker";
import { PickerView } from "src/picker/PickerView";
import { DatePickerView } from "src/picker/DatePickerView";

const list = new Array(20).fill("").map((_s, idx) => {
  return {
    label: `test value${idx}`,
    value: `${idx}`,
  };
});

export class PickerDemo extends React.Component<any, any> {
  state = {
    value: list[0].value,
  };

  render() {
    return (
      <Picker
        options={list as any}
        onChange={(v) => {
          this.setState({ value: v });
        }}
        value={this.state.value}
      />
    );
  }
}

export class PickerDemo1 extends React.Component<any, any> {
  state = {
    value: list[0].value,
  };

  render() {
    return (
      <PickerView
        options={list as any}
        onChange={(v) => {
          console.log(v, "v");
          this.setState({ value: v });
        }}
        value={this.state.value}
      />
    );
  }
}

export class PickerDemo2 extends React.Component<any, any> {
  state = {
    value: new Date(2012, 0, 20),
  };

  render() {
    return (
      <DatePickerView
        value={this.state.value}
        onChange={(value) => {
          alert(value);
          this.setState({
            value,
          });
        }}
      />
    );
  }
}
