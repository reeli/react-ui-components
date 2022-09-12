import React from "react";

interface IDayProps {
  disabled: boolean;
  current: boolean;
  isHeadOrTail: boolean;
  selected: boolean;
  onSelect: (value: any) => void;
  value: any;
  children: React.ReactChild;
}

export function Day({ selected, disabled, isHeadOrTail, current, value, onSelect, children }: IDayProps) {
  const handleClick = () => {
    onSelect(value);
  };

  return (
    <td
      onClick={handleClick}
      style={{
        padding: 10,
        color: isHeadOrTail ? "#ccc" : "black",
        background: selected ? "orange" : "#fff",
        borderWidth: current ? 1 : 0,
        borderStyle: "solid",
        borderColor: current ? "blue" : "pink",
        opacity: disabled ? 0 : 1,
      }}
    >
      {children}
    </td>
  );
}
