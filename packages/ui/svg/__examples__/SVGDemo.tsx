import { keyframes } from "@emotion/react";
import { Button } from "../../button";
import { sendMessage } from "../../notification/Message";

const move = keyframes`
   from {
     stroke-dashoffset: 320;
   }
   to {
     stroke-dashoffset: 0;
   }
`;

export function SVGDemo() {
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
      <Button
        css={{ backgroundColor: "red" }}
        onClick={() => {
          sendMessage("click me!");
        }}
      >
        button1
      </Button>
    </div>
  );
}
