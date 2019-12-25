import React from "react";
import { Button } from "../Button";

export class ButtonDemo extends React.Component<any, any> {
  render() {
    return <Button>button1</Button>;
  }
}

export class ButtonDemo2 extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Button>button2</Button>
      </div>
    );
  }
}
