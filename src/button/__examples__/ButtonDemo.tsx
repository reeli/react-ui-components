import React from "react";
import { Button } from "../Button";
import { keyframes } from "@emotion/core";

const move = keyframes`
   from {
     stroke-dashoffset: 320;
   }
   to {
     stroke-dashoffset: 0;
   }
`;

export class ButtonDemo extends React.Component<any, any> {
  render() {
    return (
      <div>
        <svg width="300px" height="175px" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="transparent"
            stroke="#000000"
            strokeWidth="5"
            d="M10 80 Q 77.5 10, 145 80 T 280 80"
            css={{
              strokeDasharray: 320,
              strokeDashoffset: 0,
              animation: `${move} 3s linear infinite`,
            }}
          />
        </svg>
        <Button>button1</Button>
      </div>
    );
  }
}

export class ButtonDemo2 extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Button>button2</Button>
        <div style={{ width: 700, height: 350 }} />
      </div>
    );
  }
}
