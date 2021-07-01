import React from "react";
import { sendMessage } from "src/notification/Message";
import { Button } from "src/button";

export class NotificationDemo extends React.Component<any, any> {
  render() {
    return (
      <Button
        onClick={() => {
          sendMessage("clicked me!");
        }}
      >
        button1
      </Button>
    );
  }
}
