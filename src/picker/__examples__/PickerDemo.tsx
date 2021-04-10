import React from "react";
import { IListingItem } from "../../listing/Listing";
import { Picker } from "src/picker/Picker";
import { PickerView } from "src/picker/PickerView";

const list = new Array(20).fill("").map((_s, idx) => {
  return {
    label: `test value${idx}`,
    value: idx,
  };
});

export class PickerDemo extends React.Component<any, any> {
  state = {
    value: list[0].value,
  };

  handleItemClick = (_: any, item: IListingItem) => {
    this.setState({
      value: item.value ? item.display : "",
    });
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

  handleItemClick = (_: any, item: IListingItem) => {
    this.setState({
      value: item.value ? item.display : "",
    });
  };

  render() {
    return (
      <PickerView
        options={list as any}
        onChange={(v) => {
          this.setState({ value: v });
        }}
        value={this.state.value}
      />
    );
  }
}
