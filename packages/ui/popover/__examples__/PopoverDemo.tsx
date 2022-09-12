import { Popover } from "../Popover";
import { Placement, useToggle } from "../../core";
import { usePopover } from "../usePopover";
import { Button } from "../../button";
import { css } from "@emotion/react";
import { Modal, ModalContent, ModalOverlay } from "../../modal";

export function PopoverDemo() {
  return (
    <div>
      <h2>Simple Popover</h2>
      <Popover
        placement={Placement.bottomLeft}
        content={<div css={{ marginTop: "0.5rem" }}>Simple popover content!</div>}
      >
        <Button>Open Popover</Button>
      </Popover>
    </div>
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
    <div>
      <h2>Customize Popover</h2>
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
    </div>
  );
}

export function PopoverDemo3() {
  const [renderPopoverContent, renderPopoverTrigger, show, , visible] = usePopover();

  return (
    <div>
      <h2>usePopover Hook</h2>
      <div>
        {renderPopoverTrigger(<Button onClick={show}>Open Popover</Button>)}
        {visible && renderPopoverContent(<div>This is popover content!</div>)}
      </div>
    </div>
  );
}

const ListItem = ({ text }: { text: string }) => {
  const [renderPopoverContent, renderPopoverTrigger, show, , visible] = usePopover();
  return (
    <>
      {renderPopoverTrigger(
        <div onClick={show} css={{ width: 200 }}>
          Open: {text}
        </div>,
      )}
      {visible && renderPopoverContent(<div>{text}</div>, Placement.right)}
    </>
  );
};

export function PopoverDemo4() {
  return (
    <div>
      <h2>List with Popover</h2>
      {["popover1", "popover2", "popover3"].map((text, idx) => (
        <ListItem key={idx} text={text} />
      ))}
    </div>
  );
}

export function PopoverDemo5() {
  const [modalVisible, openModal, hideModal] = useToggle();

  return (
    <div>
      <h2>Modal in Popover Content</h2>
      <Popover
        content={
          <div
            css={{
              padding: "1.7rem",
              background: "#fff",
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            }}
          >
            <div onClick={openModal}>Open Modal</div>
            {modalVisible && (
              <Modal>
                <ModalOverlay onClick={hideModal} />
                <ModalContent>
                  <div css={{ padding: "3rem" }}>This is Modal Content</div>
                </ModalContent>
              </Modal>
            )}
          </div>
        }
        placement={Placement.over}
      >
        <Button>Open Popover</Button>
      </Popover>
    </div>
  );
}
