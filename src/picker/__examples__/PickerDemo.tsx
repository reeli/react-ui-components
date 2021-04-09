import React from "react";
import { IListingItem } from "../../listing/Listing";
import { Picker } from "src/picker/Picker";

export class PickerDemo extends React.Component<any, any> {
  state = {
    value: "jessy",
  };

  handleItemClick = (_: any, item: IListingItem) => {
    this.setState({
      value: item.value ? item.display : "",
    });
  };

  list = new Array(20).fill("").map((_s, idx) => {
    return {
      label: `test value${idx}`,
      value: idx,
    };
  });

  render() {
    return (
      <Picker
        options={this.list as any}
        onChange={(v) => {
          console.log(v, "v");
        }}
      />
    );
  }
}
