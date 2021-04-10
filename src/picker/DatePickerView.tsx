import { useToggle } from "src/core";
import { animated, useTransition } from "react-spring";
import { Button } from "src/button";
import { Modal, ModalContent, ModalOverlay } from "src/modal";
import React, { FC, useState } from "react";
import { Option, Picker } from "src/picker/Picker";
import { range } from "lodash";

const AnimatedModalOverlay = animated(ModalOverlay);
const AnimatedModalContent = animated(ModalContent);

interface PickerViewProps {
  itemHeight?: number;
  containerHeight?: number;
  offsetItemCount?: number;
  value?: Date;
  onChange?: (value?: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const containerHeight = 300;

const toOptions = (data: number[], unit: string): Option[] => {
  return data.map((v) => {
    return {
      label: `${v} ${unit}`,
      value: `${v}`,
    };
  });
};
const getDateRange = (minDate: Date, maxDate: Date) => {
  const getRealMonth = (date: Date) => date.getMonth() + 1;

  return {
    years: toOptions(range(minDate.getFullYear(), maxDate.getFullYear() + 1), "年"),
    months: toOptions(range(getRealMonth(minDate), getRealMonth(maxDate) + 1), "月"),
    days: toOptions(range(minDate.getDate(), maxDate.getDate() + 1), "日"),
  };
};

type PickerValue = string | number | undefined;

export const DatePickerView: FC<PickerViewProps> = ({
  onChange,
  value,
  minDate = new Date("2000-01-01"),
  maxDate = new Date(),
}) => {
  const [isOpen, open, close] = useToggle();
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, y: -containerHeight },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -containerHeight },
  });
  const [year, setYear] = useState<PickerValue>();
  const [month, setMonth] = useState<PickerValue>();
  const [day, setDay] = useState<PickerValue>();
  const { years, months, days } = getDateRange(minDate, maxDate);

  return (
    <div>
      <Button onClick={open}>Date Picker</Button>
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
                      onChange && onChange();
                      close();
                    }}
                  >
                    confirm
                  </Button>
                </div>
                <div css={{ display: "flex" }}>
                  <Picker
                    options={years}
                    onChange={(year) => {
                      setYear(year);
                    }}
                    value={year}
                    containerHeight={containerHeight}
                  />
                  <Picker
                    options={months}
                    onChange={(month) => {
                      setMonth(month);
                    }}
                    value={month}
                    containerHeight={containerHeight}
                  />
                  <Picker
                    options={days}
                    onChange={(day) => {
                      setDay(day);
                    }}
                    value={day}
                    containerHeight={containerHeight}
                  />
                </div>
              </AnimatedModalContent>
            </Modal>
          ),
      )}
    </div>
  );
};
