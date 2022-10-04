import React from "react";
import { Slider } from "../Slider";

export class SliderDemo extends React.Component<any, any> {
  render() {
    return (
      <div css={{width:500, padding:50}}>
        <Slider />
      </div>
    );
  }
}
