import React from "react";
import { Button } from "../Button";
import { keyframes } from "@emotion/react";
import { sendMessage } from "src/notification/Message";

const move = keyframes`
   from {
     stroke-dashoffset: 320;
   }
   to {
     stroke-dashoffset: 0;
   }
`;

export function ButtonDemo() {
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
        onClick={() => {
          sendMessage("click me!");
        }}
      >
        button1
      </Button>
    </div>
  );
}

export class ButtonDemo2 extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Button>button2</Button>
        <svg width={86} height={28} viewBox="0 0 86 28">
          <path
            d="M3.327 27V15.567h11.285V27h3.071V2.728h-3.071v10.175H3.327V2.728H.219V27h3.108zm27.935.444c2.442 0 4.366-.851 5.92-1.85l-1.073-1.998c-1.332.851-2.775 1.406-4.477 1.406-3.441 0-5.772-2.442-5.994-6.327h12.136c.074-.444.111-1.036.111-1.665 0-5.143-2.59-8.436-7.178-8.436-4.107 0-8.066 3.589-8.066 9.472 0 5.883 3.811 9.398 8.621 9.398zm3.959-10.767h-9.62c.37-3.626 2.664-5.698 5.18-5.698 2.812 0 4.44 2.035 4.44 5.698zm10.323 10.767c.814 0 1.332-.111 1.739-.296l-.407-2.294c-.333.074-.481.074-.666.074-.444 0-.851-.37-.851-1.332V.656h-3.034v22.718c0 2.627.925 4.07 3.219 4.07zm9.435 0c.814 0 1.332-.111 1.739-.296l-.407-2.294c-.333.074-.481.074-.666.074-.444 0-.851-.37-.851-1.332V.656H51.76v22.718c0 2.627.925 4.07 3.219 4.07zm13.209 0c4.403 0 8.325-3.441 8.325-9.398 0-6.031-3.922-9.472-8.325-9.472-4.403 0-8.325 3.441-8.325 9.472 0 5.957 3.922 9.398 8.325 9.398zm0-2.516c-3.071 0-5.18-2.775-5.18-6.882 0-4.144 2.109-6.956 5.18-6.956 3.108 0 5.18 2.812 5.18 6.956 0 4.107-2.072 6.882-5.18 6.882zm16.428-5.254l.407-13.986.074-3.478h-3.071l.074 3.478.407 13.986h2.109zm-1.036 7.77c1.184 0 2.183-.962 2.183-2.294 0-1.406-.999-2.368-2.183-2.368-1.221 0-2.22.962-2.22 2.368 0 1.332.999 2.294 2.22 2.294z"
            fill="#4E4E4E"
            fillRule="nonzero"
          />
        </svg>
      </div>
    );
  }
}
