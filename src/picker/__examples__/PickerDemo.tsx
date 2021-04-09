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

  render() {
    return (
      <Picker
        options={[
          { label: "test value1", value: "0" },
          { label: "bbb 1", value: "1" },
          { label: "test value 2", value: "2" },
          { label: "test value 3", value: "3" },
          { label: "test value 4", value: "4" },
          { label: "test value 5", value: "5" },
          { label: "test value 6", value: "6" },
        ]}
        onChange={(v) => {
          console.log(v, "v");
        }}
      />
    );
  }
}
