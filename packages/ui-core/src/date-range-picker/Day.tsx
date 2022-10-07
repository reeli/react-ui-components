import { FC, PropsWithChildren } from "react";

interface DayProps {
  isActive: boolean;
  onClick: (value?: Date) => void;
  value?: Date;
  isSelected?: boolean;
  isHighlight?: boolean;
}

export const Day: FC<PropsWithChildren<DayProps>> = ({
  isActive,
  value,
  onClick,
  isSelected,
  isHighlight,
  children,
}) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <td
      onClick={handleClick}
      style={{
        padding: 10,
        color: isActive ? "black" : "#ccc",
        background: isSelected ? "red" : isHighlight ? "pink" : "#fff",
      }}
    >
      {children}
    </td>
  );
};
