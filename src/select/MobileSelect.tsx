import React, { useRef, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface MobileSelectProps {
  options: Option[];
}

// 注意：
// 1. deltaY 表示整个 content 的总偏移量
// 2. deltaY 需要加上上一次的偏移量，比如第一次滑动了 40px，第二次滑动时 deltaY 需要加上上一次的 40px，否则可能出现滑不动的情况
// 3. setState deltaY 时需要更新 offsetYStartRef


export const MobileSelect: React.FC<MobileSelectProps> = ({ options }) => {
  const itemHeight = 40;
  const containerHeight = 400;
  const offsetYStartRef = useRef<number>(0);
  const [deltaY, setDeltaY] = useState(0);

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
        onTouchEnd={() => {}}
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
