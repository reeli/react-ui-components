import React from "react";
import { Modal } from "../Modal";
import { useToggle } from "../../portal/useToggle";
import { Button } from "../../button/Button";

const modalContentStyles = {
  background: "#fff",
  padding: 25,
  borderRadius: 4,
  position: "absolute",
  zIndex: 1000,
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%,-50%,0)",
} as any;

const contentStyles = { marginBottom: 15 };

export function ModalDemo() {
  const [isOpen, open, close] = useToggle();

  return (
    <div>
      <Button onClick={open}>Open Modal</Button>
      <Modal isOpen={isOpen}>
        <div style={modalContentStyles}>
          <h2>Modal Title</h2>
          <div style={contentStyles}>This is some content.</div>
          <Button onClick={close}>Close</Button>
        </div>
      </Modal>
    </div>
  );
}
