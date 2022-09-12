import React from "react";
import { sendMessage } from "../Message";
import { Button } from "../../button";

export class NotificationDemo extends React.Component<any, any> {
  render() {
    return (
      <Button
        onClick={() => {
          sendMessage("Button Clicked!");
        }}
      >
        Send Notification
      </Button>
    );
  }
}
