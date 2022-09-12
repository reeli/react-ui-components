import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
import { useGesture } from "react-use-gesture";
import { findIndex } from "lodash";

export interface Option {
  id?: string;
  label: string;
  value: string;
}

export interface PickerProps<TValue = string> {
  options: Option[];
  onChange: (value?: TValue) => void;
  value?: TValue;
  itemHeight?: number;
  containerHeight?: number;
  offsetItemCount?: number;
}

// 注意：
// 1. deltaY 表示整个 content 的总偏移量
// 2. deltaY 需要加上上一次的偏移量，比如第一次滑动了 40px，第二次滑动时 deltaY 需要加上上一次的 40px，否则可能出现滑不动的情况
// 3. setState deltaY 时需要更新 offsetYStartRef

const getValueByIdx = (options: Option[], index: number) => {
  return options.find((_, idx) => index === idx)?.value;
};

const getIdxByValue = (options: Option[], val?: string | number) => {
  return findIndex(options, (op) => op.value === val);
};

export const Picker: React.FC<PickerProps> = ({
  options,
  onChange,
  value = options[0].value,
  itemHeight = 40,
  containerHeight = 300,
  offsetItemCount = 3,
}) => {
  const [{ y }, set] = useSpring(() => ({ y: -getIdxByValue(options, value) * itemHeight }));
  const offsetYRef = useRef(0);

  useEffect(() => {
    set({ y: -getIdxByValue(options, value) * itemHeight });
  }, [value]);

  const bind = useGesture({
    onDragStart: () => {
      offsetYRef.current = y.get();
    },
    onDrag: ({ movement }) => {
      const nextY = offsetYRef.current + movement[1];

      if (nextY > itemHeight * offsetItemCount) {
        return;
      }
      if (nextY < -itemHeight * (options.length - 1 + offsetItemCount)) {
        return;
      }

      return set({ y: nextY });
    },
    onDragEnd: ({ movement, elapsedTime }) => {
      let nextY = offsetYRef.current + movement[1];

      if (elapsedTime < 200) {
        // 惯性 v = s/t
        // https://github.com/Tencent/weui.js/blob/master/src/picker/scroll.js#L176
        // 要实现惯性效果，需要计算出到达指定 item 之后额外运行的距离 d, d = v* 150(magic number)
        nextY = nextY + (movement[1] / elapsedTime) * 150;
      }

      if (nextY >= 0) {
        set({ y: 0 });
        onChange(getValueByIdx(options, 0));

        return;
      }
      if (nextY <= -(options.length - 1) * itemHeight) {
        const idx = options.length - 1;
        set({ y: -(options.length - 1) * itemHeight });

        onChange(getValueByIdx(options, idx));
        return;
      }

      const index = Math.round(nextY / itemHeight);
      set({ y: index * itemHeight });

      onChange(getValueByIdx(options, Math.abs(index)));
    },
  });

  // const [index, setIndex] = useState(0);

  return (
    <div
      css={{
        position: "relative",
        width: "100%",
        height: containerHeight,
        // border: "1px solid #ccc",
        overflow: "hidden",
        touchAction: "none",
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
          // backgroundColor: "rgba(0,0,0,0.3)",
          backgroundImage:
            "linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6))",
          backgroundPosition: "top,bottom",
          backgroundRepeat: "no-repeat",
        }}
        style={{ backgroundSize: `100% ${containerHeight / 2 - itemHeight / 2}px` }}
        {...bind()}
      />
      <div
        className={"indicator"}
        css={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "100%",
          height: itemHeight,
          borderTop: "1px solid #ccc",
          borderBottom: "1px solid #ccc",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
      <animated.div
        className={"content"}
        css={{
          width: "100%",
          position: "absolute",
          top: containerHeight / 2 - itemHeight / 2,
          left: 0,
          zIndex: 1,
          // backgroundColor: "pink",
        }}
        style={{ y }}
      >
        {options.map((option, index) => (
          <div
            css={{
              height: itemHeight,
              lineHeight: `${itemHeight}px`,
              textAlign: "center",
            }}
            key={index}
            style={{ fontSize: option.value === value ? "17px" : "16px" }}
          >
            {option.label}
          </div>
        ))}
      </animated.div>
    </div>
  );
};
