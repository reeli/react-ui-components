import { usePrevious, useToggle } from "../core";
import { animated, useTransition } from "react-spring";
import { Button } from "../button";
import { Modal, ModalContent, ModalOverlay } from "../modal";
import  { FC, useEffect, useState } from "react";
import { Option, Picker } from "./Picker";
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

const getYearRange = (minDate: Date, maxDate: Date, unit: string) =>
  toOptions(range(minDate.getFullYear(), maxDate.getFullYear() + 1), unit);

const getDays = (year: string | number, month: string | number) => {
  const days = range(1, new Date(Number(year), Number(month), 0).getDate() + 1);
  return toOptions(days, "日");
};

const getMonths = (maxMonth = 12, unit: string) => {
  return toOptions(range(1, maxMonth + 1), unit);
};

type PickerValue = string | undefined;

const CONSTANTS = {
  year: "年",
  month: "月",
  day: "日",
  cancel: "取消",
  confirm: "确定",
  title: "出生日期",
};

const formatDateYYYYMMDD = (date: Date) => {
  const mm = date.getMonth() + 1; // getMonth() is zero-based
  const dd = date.getDate();

  return [date.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("-");
};

const PickerContent: FC<PickerViewProps & { close: () => void }> = ({
  onChange,
  value = new Date(),
  minDate = new Date("2000-01-01"),
  maxDate = new Date(),
  close,
}) => {
  const [year, setYear] = useState<PickerValue>(`${value?.getFullYear()}`);
  const correctMonth = value.getMonth() + 1;
  const [month, setMonth] = useState<PickerValue>(`${correctMonth}`);
  const prevMonth = usePrevious(month);
  const prevYear = usePrevious(year);

  const [day, setDay] = useState<PickerValue>(`${value?.getDate()}`);
  const [days, setDays] = useState(getDays(value.getFullYear(), correctMonth));

  useEffect(() => {
    if (prevMonth && prevYear && (prevMonth !== month || prevYear !== year)) {
      // TODO: resolve type issue
      const nextDays = getDays(year as any, month as any);
      setDays(getDays(year as any, month as any));
      const maxDay = Number(nextDays[nextDays.length - 1].value);
      if (Number(day) > maxDay) {
        setDay(`${maxDay}`);
      }
    }
  }, [year, month]);

  return (
    <>
      <div css={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc" }}>
        <div onClick={close} css={{ padding: 15, cursor: "pointer" }}>
          {CONSTANTS.cancel}
        </div>
        <div css={{ padding: 15 }}>{CONSTANTS.title}</div>
        <div
          onClick={() => {
            onChange && onChange(new Date([year, month, day] as any));
            close();
          }}
          css={{ color: "#429DFE", padding: 15, cursor: "pointer" }}
        >
          {CONSTANTS.confirm}
        </div>
      </div>
      <div css={{ display: "flex" }}>
        <Picker
          options={getYearRange(minDate, maxDate, CONSTANTS.year)}
          onChange={(year) => {
            setYear(year);
          }}
          value={year}
          containerHeight={containerHeight}
        />
        <Picker
          options={getMonths(12, CONSTANTS.month)}
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
    </>
  );
};

export const DatePickerView: FC<PickerViewProps> = ({
  onChange,
  value = new Date(),
  minDate = new Date("2000-01-01"),
  maxDate = new Date(),
}) => {
  const [isOpen, open, close] = useToggle();
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: "translate3d(0, 100%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, 100%, 0)" },
    config: { mass: 1, tension: 320, friction: 35 },
  });

  return (
    <div>
      <Button onClick={open}>Date Picker</Button>
      <div>{formatDateYYYYMMDD(value)}</div>
      {transitions(
        (styles, item, _, key) =>
          item && (
            <Modal key={key}>
              <AnimatedModalOverlay style={{ opacity: styles.opacity }} />
              <AnimatedModalContent style={{ bottom: 0, transform: styles.transform }}>
                <PickerContent value={value} onChange={onChange} minDate={minDate} maxDate={maxDate} close={close} />
              </AnimatedModalContent>
            </Modal>
          ),
      )}
    </div>
  );
};
