import React from "react";
import { useState } from "react";
import { Popover } from "../Popover";
import { Placement } from "../../core";

export function PopoverDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <div>
        <Popover
          content="Purchase or reload your card, get ¥10 extra!"
          placement={Placement.top}
          closeOnClickOutSide={false}
          visible={visible}
        >
          <button>top</button>
        </Popover>
        <button onClick={() => setVisible(!visible)}>hide popover button</button>
        <Popover content="Purchase or reload your card, get ¥10 extra!" placement={Placement.topLeft}>
          <button>top left</button>
        </Popover>
        <Popover content="Purchase or reload your card, get ¥10 extra!" placement={Placement.topRight}>
          <button>top right</button>
        </Popover>
      </div>
      <div>
        <Popover content="Purchase or reload your card, get ¥10 extra!" placement={Placement.bottom}>
          <button>bottom</button>
        </Popover>
        <Popover content="Purchase or reload your card, get ¥10 extra!" placement={Placement.bottomLeft}>
          <button>bottom left</button>
        </Popover>
        <Popover content="Purchase or reload your card, get ¥10 extra!" placement={Placement.bottomRight}>
          <button>bottom Right</button>
        </Popover>
      </div>
      <div>
        <Popover
          content={
            <div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
            </div>
          }
          placement={Placement.left}
        >
          <button>left</button>
        </Popover>
        <Popover
          content={
            <div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
            </div>
          }
          placement={Placement.leftTop}
        >
          <button>left top</button>
        </Popover>
        <Popover
          content={
            <div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
            </div>
          }
          placement={Placement.leftBottom}
        >
          <button>left bottom</button>
        </Popover>
      </div>
      <div>
        <Popover
          content={
            <div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
            </div>
          }
          placement={Placement.right}
        >
          <button>right</button>
        </Popover>
        <Popover
          content={
            <div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
            </div>
          }
          placement={Placement.rightTop}
        >
          <button>right top</button>
        </Popover>
        <Popover
          content={
            <div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
              <div>Purchase or reload your card, get ¥10 extra!</div>
            </div>
          }
          placement={Placement.rightBottom}
        >
          <button>right bottom</button>
        </Popover>
      </div>
    </>
  );
}
