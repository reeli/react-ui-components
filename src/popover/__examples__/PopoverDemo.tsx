import React from "react";
import { Popover } from "../Popover";
import { Placement, useToggle } from "src/core";
import { usePopover } from "src/popover/usePopover";
import { Button } from "src/button";
import { css } from "@emotion/core";
import { Demo } from "style-guide/components/Demo";
import { Modal, ModalContent, ModalOverlay } from "src/modal";

export function PopoverDemo() {
  return (
    <Demo title={"Simple Popover"}>
      <Popover
        placement={Placement.bottomLeft}
        content={<div css={{ marginTop: "0.5rem" }}>Simple popover content!</div>}
      >
        <Button>Open Popover</Button>
      </Popover>
    </Demo>
  );
}

const popoverStyles = css({
  position: "absolute",
  zIndex: 1000,
  padding: "8px 0",
  minWidth: 300,
});

const popoverInnerStyles = css({
  backgroundColor: "#4a4a4a",
  color: "#fff",
  fontSize: "14px",
  padding: ".3rem",
});

const arrowUp = css({
  position: "absolute",
  top: 0,
  left: "10%",
  marginLeft: "-5px",
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderBottom: "8px solid #4a4a4a",
  width: 0,
  height: 0,
});

export function PopoverDemo2() {
  return (
    <Demo title={"Customize Popover"}>
      <Popover
        placement={Placement.bottomLeft}
        content={
          <div css={popoverStyles}>
            <div css={arrowUp} />
            <div css={popoverInnerStyles}>Customize popover content!</div>
          </div>
        }
      >
        <Button>Open Popover</Button>
      </Popover>
    </Demo>
  );
}

export function PopoverDemo3() {
  const [renderPopoverContent, renderPopoverTrigger, show] = usePopover();

  return (
    <Demo title={"usePopover Hook"}>
      <div>
        {renderPopoverTrigger(<Button onClick={show}>Open Popover</Button>)}
        {renderPopoverContent(<div>This is popover content!</div>)}
      </div>
    </Demo>
  );
}

const ListItem = ({ text }: { text: string }) => {
  const [renderPopoverContent, renderPopoverTrigger, show] = usePopover();
  return (
    <>
      {renderPopoverContent(<div>{text}</div>, Placement.right)}
      {renderPopoverTrigger(
        <div onClick={show} css={{ width: 200 }}>
          Open: {text}
        </div>,
      )}
    </>
  );
};

export function PopoverDemo4() {
  return (
    <Demo title={"List with Popover"}>
      {["popover1", "popover2", "popover3"].map((text, idx) => (
        <ListItem key={idx} text={text} />
      ))}
    </Demo>
  );
}

export function PopoverDemo5() {
  const [modalVisible, openModal, hideModal] = useToggle();

  return (
    <Demo title={"Modal in Popover Content"}>
      <Popover
        content={
          <div
            css={{
              padding: "1rem",
              background: "#fff",
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            }}
          >
            <div onClick={openModal}>Open Modal</div>
            {modalVisible && (
              <Modal>
                <ModalOverlay onClick={hideModal} />
                <ModalContent>This is Modal Content</ModalContent>
              </Modal>
            )}
          </div>
        }
        placement={Placement.over}
      >
        <Button>Open Popover</Button>
      </Popover>
    </Demo>
  );
}
