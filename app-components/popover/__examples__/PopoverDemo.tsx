import { css } from "glamor";
import * as React from "react";
import { Popover } from "../Popover";
import { Placement } from "../../core/usePlacement";

export class PopoverDemo extends React.Component<any, any> {
  render() {
    return (
      <>
        <Popover
          content="Purchase or reload your card, get ¥10 extra!"
          placement={Placement.bottomLeft}
          closeOnClickOutSide={false}
        >
          <span {...css({ marginLeft: "23rem" })}>Popover Left</span>
        </Popover>
        <Popover content="Purchase or reload your card, get ¥10 extra!" placement={Placement.bottomCenter}>
          <span {...css({ marginLeft: "23rem" })}>Popover Right</span>
        </Popover>
      </>
    );
  }
}
