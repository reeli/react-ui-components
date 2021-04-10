import { useToggle } from "src/core";
import { animated, useTransition } from "react-spring";
import { Button } from "src/button";
import { Modal, ModalContent, ModalOverlay } from "src/modal";
import React, { FC, useState } from "react";
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
  const [val, setVal] = useState(value);

  return (
    <div>
      <Button onClick={open}>Select Picker </Button>
      <div>{value}</div>
      {transitions(
        (styles, item, _, key) =>
          item && (
            <Modal key={key}>
              <AnimatedModalOverlay style={{ opacity: styles.opacity }} onClick={close} />
              <AnimatedModalContent style={{ bottom: styles.y }}>
                <div>
                  <Button onClick={close}>cancel</Button>
                  <Button
                    onClick={() => {
                      onChange(val);
                      close();
                    }}
                  >
                    confirm
                  </Button>
                </div>
                <Picker
                  options={options}
                  onChange={(v) => {
                    setVal(v);
                  }}
                  value={val}
                  containerHeight={containerHeight}
                />
              </AnimatedModalContent>
            </Modal>
          ),
      )}
    </div>
  );
};
