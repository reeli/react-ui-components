import React from "react";
import { Slider } from "src/slider/Slider";
import { keyframes } from "@emotion/react";

const move = keyframes`
   from {
     stroke-dashoffset: 320;
   }
   to {
     stroke-dashoffset: 0;
   }
`;

export class SliderDemo extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Slider>button1</Slider>
      </div>
    );
  }
}
