import React from "react";

interface IDayProps {
  isActive: boolean;
  selected: boolean;
  onSelect: (value: any) => void;
  value: any;
  children: React.ReactChild;
}

export function Day({ selected, isActive, value, onSelect, children }: IDayProps) {
  const handleClick = () => {
    onSelect(value);
  };

  return (
    <td
      onClick={handleClick}
      style={{
        padding: 10,
        color: isActive ? "black" : "#ccc",
        background: selected ? "orange" : "#fff",
        borderStyle: "solid",
        // borderColor: current ? "blue" : "pink",
        // opacity: disabled ? 0 : 1,
      }}
    >
      {children}
    </td>
  );
}
