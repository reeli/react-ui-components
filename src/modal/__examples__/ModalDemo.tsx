import React, { useState } from "react";
import { Modal } from "../Modal";
import { useToggle } from "src/core";
import { Button } from "src/button";
import { ModalOverlay } from "src/modal/ModalOverlay";
import { ModalContent } from "src/modal/ModalContent";

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
  const [isOpen, open, close] = useToggle();

  return (
    <div>
      <p>Simple Modal</p>
      <Button onClick={open}>Open Modal</Button>
      <Modal isOpen={isOpen}>
        <ModalOverlay onClick={close} />
        <ModalContent>
          <p>This is a simple modal</p>
        </ModalContent>
      </Modal>
    </div>
  );
}

export function ModalDemo2() {
  const [isOpen, open, close] = useToggle();

  return (
    <div>
      <p>Modal in Modal</p>
      <Button onClick={open}>Open Modal</Button>
      <Modal isOpen={isOpen}>
        <ModalOverlay onClick={close} />
        <div style={{ ...modalContentStyles, ...getModalStyle() }}>
          <ModalDemo2 />
        </div>
      </Modal>
    </div>
  );
}

export function ModalDemo3() {
  const [state, setState] = useState(0);
  const [isOpen, open, close] = useToggle();

  return (
    <div>
      <p>State Change in Modal Content</p>
      <Button onClick={open}>Open Modal</Button>
      <Modal isOpen={isOpen}>
        <ModalOverlay onClick={close} />
        <ModalContent>
          <Button onClick={() => setState(val => val + 1)}>Click to increase number</Button>
          <p>{state}</p>
        </ModalContent>
      </Modal>
    </div>
  );
}
