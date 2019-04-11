import React from "react";
import { Moment } from "moment";

export interface IDay {
  date: Moment;
  enable: boolean;
  selected: boolean;
  active: boolean;
}

interface IDayProps extends IDay {
  day: number;
  onSelect: (day: IDay) => void;
}

export function Day({ selected, enable, day, active, date, onSelect }: IDayProps) {
  const handleClick = () => {
    onSelect({
      enable,
      selected: true,
      active: true,
      date,
    });
  };

  return (
    <td
      onClick={handleClick}
      style={{
        padding: 10,
        color: enable ? "black" : "#ccc",
        background: selected ? "orange" : "#fff",
        borderWidth: active ? 1 : 0,
        borderStyle: "solid",
        borderColor: "pink",
      }}
    >
      {day}
    </td>
  );
}
