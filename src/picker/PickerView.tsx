import { useToggle } from "src/core";
import { animated, useTransition } from "react-spring";
import { Button } from "src/button";
import { Modal, ModalContent, ModalOverlay } from "src/modal";
import React, { FC } from "react";
import { Picker, PickerProps } from "src/picker/Picker";

const AnimatedModalOverlay = animated(ModalOverlay);
const AnimatedModalContent = animated(ModalContent);

interface PickerViewProps extends PickerProps {}

const containerHeight = 300;

export const PickerView: FC<PickerViewProps> = ({ options, onChange, value }) => {
  const [isOpen, open, close] = useToggle();
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, y: -containerHeight },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -containerHeight },
  });

  return (
    <div>
      <Button onClick={open}>Select Picker </Button>
      {transitions(
        (styles, item, _, key) =>
          item && (
            <Modal key={key}>
              <AnimatedModalOverlay style={{ opacity: styles.opacity }} onClick={close} />
              <AnimatedModalContent style={{ bottom: styles.y }}>
                <Picker options={options} onChange={onChange} value={value} containerHeight={containerHeight} />
              </AnimatedModalContent>
            </Modal>
          ),
      )}
    </div>
  );
};
