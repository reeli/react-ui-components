import { css } from "@emotion/react";
import { useRef, useState, MouseEvent, FC, useEffect } from "react";
import { useGesture } from "react-use-gesture";
import { SliderMark } from "./SliderMark";
import { isUndefined } from "lodash";

// 1. css() 方法会创建一个 className， append 到 style 里面，因此对于动态计算的样式，最好放到 inline style 属性上，避免频繁的创建 css class（每当属性发生变化都会创建新的 class？如果样式属性不变，那么 re-render 时应该不会重新创建新的 class?）
// 2. css point-event: none 表示鼠标事件“穿透”该元素并且指定该元素“下面”的任何东西

// TODO: 增大 click 进度条时候的点击区域(增加一个透明背景层)

const basic = 12;

const constraintPercentage = (percentage: number) => {
  if (!percentage) {
    return 0;
  }

  if (percentage > 100) {
    return 100;
  }

  if (percentage < 0) {
    return 0;
  }

  return percentage;
};

interface SliderProps {
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
  onChange?: (value?: number) => void;
}

const getDefaultPercentage = ({
  defaultValue,
  min,
  max,
  step,
}: {
  defaultValue: number;
  step: number;
  min?: number;
  max?: number;
}) => {
  if (!step || isUndefined(max) || isUndefined(min)) {
    return defaultValue;
  }

  if (defaultValue % step !== 0) {
    throw new Error("Default value is incompatible with the step");
  }

  let val = defaultValue;

  if (defaultValue < min) {
    val = min;
  }

  if (defaultValue > max) {
    val = max;
  }

  return Math.round(val / max) * 100;
};

const calSteps = (step: number, max?: number, min?: number) => {
  if (isUndefined(step) || isUndefined(max) || isUndefined(min)) {
    return [];
  }

  const numberOfMarks = Math.ceil(max / step);
  return new Array(numberOfMarks + 1).fill(0).map((_, idx) => {
    const next = idx * step;
    if (next < min) {
      return min;
    }

    if (next > max) {
      return max;
    }

    return next;
  });
};

export const Slider: FC<SliderProps> = ({ defaultValue = 0, step = 1, min = 0, max = 100, onChange }) => {
  const sliderTrackEl = useRef<HTMLDivElement>(null);
  const sliderEl = useRef<HTMLDivElement>(null);
  const sliderProgressEl = useRef<HTMLDivElement>(null);

  const [percentage, setPercentage] = useState(
    constraintPercentage(getDefaultPercentage({ min, max, step, defaultValue })),
  );

  useEffect(() => {
    onChange && onChange(percentage);
  }, [percentage]);

  const bind = useGesture({
    onDragEnd: ({ movement: [mx], event }) => {
      if ((event.target as HTMLDivElement).getAttribute("role") !== "slider") {
        return;
      }

      const sliderTrackRect = sliderTrackEl.current?.getBoundingClientRect();

      if (!sliderTrackRect) {
        return;
      }

      const deltaX = sliderTrackRect.width / 100;

      setPercentage((percentage) => {
        const currentX = mx + percentage * deltaX;
        return constraintPercentage(Math.round(currentX / deltaX));
      });
    },
    onDrag: ({ movement: [mx], event }) => {
      if ((event.target as HTMLDivElement).getAttribute("role") !== "slider") {
        return;
      }

      const sliderTrackRect = sliderTrackEl.current?.getBoundingClientRect();
      if (!sliderEl.current || !sliderProgressEl.current || !sliderTrackRect) {
        return;
      }

      const deltaX = sliderTrackRect.width / 100;
      const currentX = percentage * deltaX + mx;

      let nextPercentage = Math.round(currentX / deltaX);
      if (nextPercentage > 100) {
        nextPercentage = 100;
      }

      if (nextPercentage < 0) {
        nextPercentage = 0;
      }

      sliderEl.current.style.left = `calc(${nextPercentage}% - ${basic}px)`;
      sliderProgressEl.current!.style.width = `${nextPercentage}%`;
    },
  });

  const handleSlickTrackClick = (evt: MouseEvent<HTMLDivElement>) => {
    const sliderTrackRect = sliderTrackEl.current?.getBoundingClientRect();
    if (!sliderTrackRect) {
      return;
    }

    const deltaX = sliderTrackRect.width / 100;
    const nextX = constraintPercentage(Math.round((evt.clientX - sliderTrackRect.x) / deltaX));

    if (step && max) {
      const num = Math.round(((nextX / 100) * max) / step);
      setPercentage(() => ((num * step) / max) * 100);
      return;
    }

    setPercentage(() => {
      return constraintPercentage(nextX);
    });
  };

  return (
    <div css={containerStyles} onClick={handleSlickTrackClick} {...bind()}>
      {calSteps(step, max, min).map((v) => {
        return <SliderMark value={(v / max!) * 100} label={v} key={v} />;
      })}

      <div css={sliderTrackStyles} ref={sliderTrackEl}>
        <div css={sliderFilledTrackStyles} style={{ width: `${percentage}%` }} ref={sliderProgressEl}></div>
      </div>
      <div
        css={sliderStyles}
        style={{ left: `calc(${percentage}% - ${basic}px)` }}
        ref={sliderEl}
        role={"slider"}
      ></div>
      <input type={"hidden"} value={percentage} />
    </div>
  );
};

const containerStyles = css({
  position: "relative",
  paddingTop: basic,
  paddingBottom: basic,
  outline: 0,
  // display: "inline-block",
  width: "100%",
  touchAction: "none",
  userSelect: "none",
  cursor: "pointer",
});

const sliderTrackStyles = css({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "100%",
  height: "0.5rem",
  overflow: "hidden",
  backgroundColor: "grey",
  borderRadius: "0.2rem",
});

const sliderFilledTrackStyles = css({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "red",
  height: "inherit",
  overflowX: "auto",
});

const sliderStyles = css({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: basic * 2,
  height: basic * 2,
  borderRadius: "50%",
  // backgroundColor: "currentColor",
  background: "rgba(0,0,0,0.7)",
  outline: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  touchAction: "none",
  userSelect: "none",
  zIndex: 1,
  // left: "calc(0% - 7px)",
});
