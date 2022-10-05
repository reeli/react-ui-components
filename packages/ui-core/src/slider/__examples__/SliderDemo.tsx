import React from "react";
import { Slider } from "../Slider";

export class SliderDemo extends React.Component<any, any> {
  render() {
    return (
      <>
        <div css={{ width: 500, padding: 50 }}>
          <Slider />
        </div>
        <div  css={{ width: 500, padding: 50 }}>
          <Slider defaultValue={690} min={0} max={700} step={30} onChange={(value)=>{
            console.log(value,'value');
          }}/>
        </div>
      </>
    );
  }
}
