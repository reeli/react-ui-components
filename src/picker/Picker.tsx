import React, { useRef, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface PickerProps {
  options: Option[];
  onChange: (value?: string) => void;
}

// 注意：
// 1. deltaY 表示整个 content 的总偏移量
// 2. deltaY 需要加上上一次的偏移量，比如第一次滑动了 40px，第二次滑动时 deltaY 需要加上上一次的 40px，否则可能出现滑不动的情况
// 3. setState deltaY 时需要更新 offsetYStartRef

export const Picker: React.FC<PickerProps> = ({ options, onChange }) => {
  const itemHeight = 40;
  const containerHeight = 400;
  const offsetYStartRef = useRef<number>(0);
  const [deltaY, setDeltaY] = useState(0);

  // const [index, setIndex] = useState(0);

  const getValueByIdx = (index: number) => {
    return options.find((_, idx) => index === idx)?.value;
  };

  return (
    <div
      css={{
        position: "relative",
        width: 500,
        height: containerHeight,
        border: "1px solid blue",
        overflow: "hidden",
      }}
    >
      <div
        className={"mask"}
        css={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          zIndex: 3,
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
        onTouchStart={(e) => {
          offsetYStartRef.current = Math.floor(e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // console.log(e.touches[0],'e.touches[0]')
          const currentY = Math.floor(e.touches[0].clientY);
          setDeltaY((prevDeltaY) => {
            const dY = prevDeltaY + (currentY - offsetYStartRef.current);

            if (dY > itemHeight || dY < -options.length * itemHeight) {
              return prevDeltaY;
            }

            // 1. setState deltaY 时需要更新 offsetYStartRef
            offsetYStartRef.current = currentY;

            return dY;
          });
        }}
        onTouchEnd={() => {
          if (deltaY >= 0) {
            setDeltaY(0);
            // setIndex(0);
            onChange(getValueByIdx(0));

            return;
          }
          if (deltaY <= -(options.length - 1) * itemHeight) {
            setDeltaY(-(options.length - 1) * itemHeight);
            const idx = options.length - 1;
            // setIndex(options.length - 1);
            onChange(getValueByIdx(idx));
            return;
          }

          const index = Math.round(deltaY / itemHeight);
          setDeltaY(index * itemHeight);
          // setIndex(Math.abs(index));
          onChange(getValueByIdx(Math.abs(index)));
        }}
      />
      <div
        className={"indicator"}
        css={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "100%",
          height: itemHeight,
          border: "1px solid red",
          zIndex: 2,
        }}
      />
      <div
        className={"content"}
        css={{
          width: "100%",
          position: "absolute",
          top: containerHeight / 2 - itemHeight / 2,
          left: 0,
          zIndex: 1,
          backgroundColor: "pink",
        }}
        style={{ transform: `translateY(${deltaY}px)` }}
      >
        {options.map((option, index) => {
          return (
            <div css={{ height: itemHeight }} key={index}>
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
