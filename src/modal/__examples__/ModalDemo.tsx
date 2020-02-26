import React, { useState } from "react";
import { Modal } from "src/modal/Modal";
import { useToggle } from "src/core";
import { Button } from "src/button";
import { ModalOverlay } from "src/modal/ModalOverlay";
import { ModalContent } from "src/modal/ModalContent";
import { css } from "@emotion/core";
import { animated, useTransition } from "react-spring";
import { Demo } from "style-guide/components/Demo";

export function ModalDemo() {
  const [isOpen, open, close] = useToggle();

  return (
    <Demo title={"Simple Modal"}>
      <Button onClick={open}>Open Modal</Button>
      <Modal visible={isOpen}>
        <ModalOverlay onClick={close} />
        <ModalContent>
          <p>This is a simple modal</p>
        </ModalContent>
      </Modal>
    </Demo>
  );
}

const modalContentStyles = css({
  background: "#fff",
  padding: 25,
  borderRadius: 4,
  position: "absolute",
  zIndex: 1000,
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%,-50%,0)",
});

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

export function ModalDemo2() {
  const [isOpen, open, close] = useToggle();

  return (
    <Demo title={"Modal in Modal"}>
      <Button onClick={open}>Open Modal</Button>
      <Modal visible={isOpen}>
        <ModalOverlay onClick={close} />
        <div css={[modalContentStyles, getModalStyle()]}>
          <ModalDemo2 />
        </div>
      </Modal>
    </Demo>
  );
}

export function ModalDemo3() {
  const [state, setState] = useState(0);
  const [isOpen, open, close] = useToggle();

  return (
    <Demo title={"State Change in Modal Content"}>
      <Button onClick={open}>Open Modal</Button>
      <Modal visible={isOpen}>
        <ModalOverlay onClick={close} />
        <ModalContent>
          <Button onClick={() => setState(val => val + 1)}>Click to increase number</Button>
          <p>{state}</p>
        </ModalContent>
      </Modal>
    </Demo>
  );
}

export function ModalDemo4() {
  const [isOpen, open, close] = useToggle();
  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <Demo title={"Modal with Animation"}>
      <Button onClick={open}>Open Modal</Button>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Modal visible key={key}>
              <animated.div style={props}>
                <ModalOverlay onClick={close} />
                <ModalContent>
                  <p>This is a modal</p>
                </ModalContent>
              </animated.div>
            </Modal>
          ),
      )}
    </Demo>
  );
}
