import React, { useState } from "react";
import { Modal } from "../Modal";
import { useToggle } from "../../core/useToggle";
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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export function ModalDemo() {
  const [state, setState] = useState(0);

  const [isOpen, open, close] = useToggle();

  return (
    <div>
      <Button onClick={open}>Open Modal</Button>
      <Modal isOpen={isOpen} onBackDropClick={close}>
        <div style={{ ...modalContentStyles, ...getModalStyle() }}>
          <h2>Modal Title</h2>
          <div style={contentStyles}>
            This is some content.
            <Button onClick={() => setState(val => val + 1)}>{state}</Button>
          </div>
          <Button onClick={close}>Close</Button>
          <ModalDemo />
        </div>
      </Modal>
    </div>
  );
}
