import React from "react";
import { Popover } from "../Popover";
import { Placement } from "src/core";
import { usePopover } from "src/popover/usePopover";

const Child = ({ text }: { text: string }) => {
  const [renderPopoverContent, renderPopoverTrigger, show] = usePopover();
  return (
    <>
      {renderPopoverContent(<div>{text}</div>)}
      {renderPopoverTrigger(<div onClick={show}>trigger: {text}</div>)}
    </>
  );
};

export function PopoverDemo() {
  const [renderPopoverContent, renderPopoverTrigger, show, hide] = usePopover();
  return (
    <>
      <div>
        <div>
          {renderPopoverTrigger(<button onClick={show}>top</button>)}
          {renderPopoverContent(<div>Purchase or reload your card, get ¥10 extra!</div>, Placement.top)}
          <div>
            <button onClick={hide}>hide popover button</button>
          </div>
        </div>

        {["test1", "test2", "test3"].map((text, idx) => {
          return <Child key={idx} text={text} />;
        })}

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
