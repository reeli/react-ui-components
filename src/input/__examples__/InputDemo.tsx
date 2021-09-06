import React from "react";
import { Input } from "../Input";

export class InputDemo extends React.Component<any, any> {
  state = {
    value: "",
  };

  handleChange = (_: any, value: string) => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <Input name={"demoInput"} value={this.state.value} placeholder="placeholder..." onChange={this.handleChange} />
    );
  }
}
