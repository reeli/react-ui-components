import { useToggle } from "src/core";
import { animated, useTransition } from "react-spring";
import { Modal, ModalContent, ModalOverlay } from "src/modal";
import React, { FC, ReactElement } from "react";

const AnimatedModalOverlay = animated(ModalOverlay);
const AnimatedModalContent = animated(ModalContent);

// TODO: fix children type
export const PickerWrapper: FC<{
  children: ({ close }: { close: () => void }) => ReactElement;
  header: (open: () => void) => ReactElement;
}> = ({ children, header }) => {
  const [isOpen, open, close] = useToggle();
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: "translate3d(0, 100%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, 100%, 0)" },
    config: { mass: 1, tension: 320, friction: 35 },
  });

  return (
    <div>
      {header(open)}
      {transitions(
        (styles, item, _, key) =>
          item && (
            <Modal key={key}>
              <AnimatedModalOverlay style={{ opacity: styles.opacity }} />
              <AnimatedModalContent style={{ bottom: 0, transform: styles.transform }}>
                {children({ close })}
              </AnimatedModalContent>
            </Modal>
          ),
      )}
    </div>
  );
};
