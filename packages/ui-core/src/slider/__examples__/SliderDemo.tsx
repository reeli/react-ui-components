import React from "react";
import { Slider } from "../Slider";

export class SliderDemo extends React.Component<any, any> {
  render() {
    return (
      <>
        <div css={{ width: 500, padding: 50 }}>
          <Slider
            defaultValue={0}
            onChange={(v) => {
              console.log(v, "v1");
            }}
          />
        </div>
        <div css={{ width: 500, padding: 50 }}>
          <Slider
            defaultValue={50}
            min={0}
            max={600}
            step={100}
            onChange={(v) => {
              console.log(v, "v2");
            }}
          />
        </div>
      </>
    );
  }
}
