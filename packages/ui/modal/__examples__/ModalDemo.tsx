import { useState } from "react";
import { useToggle } from "../../core";
import { Button } from "../../button";
import { css } from "@emotion/react";
import { animated, useTransition } from "react-spring";
import { ModalBody,ModalFooter,ModalOverlay,ModalContent,ModalHeader,Modal } from "../../modal";

export function ModalDemo() {
  const [isOpen, open, close] = useToggle();

  return (
    <div>
      <h2>Simple Modal</h2>
      <Button onClick={open}>Open Modal</Button>
      {isOpen && (
        <Modal>
          <ModalOverlay onClick={close} />
          <ModalContent>
            <p css={{ padding: "1rem" }}>This is a simple modal</p>
          </ModalContent>
        </Modal>
      )}
    </div>
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
    <div>
      <h2>Modal in Modal</h2>
      <Button onClick={open}>Open Modal</Button>
      {isOpen && (
        <Modal>
          <ModalOverlay onClick={close} />
          <div css={[modalContentStyles, getModalStyle()]}>
            <ModalDemo2 />
          </div>
        </Modal>
      )}
    </div>
  );
}

export function ModalDemo3() {
  const [state, setState] = useState(0);
  const [isOpen, open, close] = useToggle();

  return (
    <div>
      <h2>State Change in Modal Content</h2>
      <Button onClick={open}>Open Modal</Button>
      {isOpen && (
        <Modal>
          <ModalOverlay onClick={close} />
          <ModalContent>
            <div css={{ padding: "1rem" }}>
              <Button onClick={() => setState((val) => val + 1)}>Click to increase number</Button>
              <p>{state}</p>
            </div>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

const AnimatedModalOverlay = animated(ModalOverlay);
const AnimatedModalContent = animated(ModalContent);

export function ModalDemo4() {
  const [isOpen, open, close] = useToggle();
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
  });

  // 需要等动画结束之后才能关闭弹出窗，为什么 react spring 能够在动画关闭之后才销毁弹出窗？
  // 因为最终 modal 的显示与否不是直接通过 `isOpen` 状态来决定，而是通过 react spring 提供的 `item` 状态来决定
  // 当 isOpen=false 时，useTransition 会重新执行，然后执行 leave 动画，动画执行完成之后将更新的 `item` 提供下来，从而让 Modal 关闭

  return (
    <div>
      <div>Modal with Animation</div>
      <Button onClick={open}>Open Modal</Button>
      {transitions(
        (styles, item, _, key) =>
          item && (
            <Modal key={key}>
              <AnimatedModalOverlay style={{ opacity: styles.opacity }} onClick={close} />
              <AnimatedModalContent style={{ transform: styles.transform }}>
                <p css={{ padding: "1rem" }}>This is a modal</p>
              </AnimatedModalContent>
            </Modal>
          ),
      )}
    </div>
  );
}

export function ModalDemo5() {
  const [isOpen, open, close] = useToggle();
  const [disabled, setDisabled] = useState(false);

  return (
    <div>
      <h1>Modal with Async Logic</h1>
      <Button onClick={open}>Open Modal</Button>
      {isOpen && (
        <Modal>
          <ModalOverlay onClick={close} />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalBody>Some text is here</ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  console.log("on click");
                  setDisabled(true);
                  setTimeout(() => {
                    setDisabled(false);
                    close();
                  }, 1500);
                }}
                disabled={disabled}
              >
                {disabled ? "Loading..." : "Confirm"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
