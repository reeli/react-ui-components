import { css } from "@emotion/react";
import { useRef, useState, MouseEvent } from "react";
import { useGesture } from "react-use-gesture";
import { SliderMark } from "./SliderMark";

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

export const Slider = ({ defaultValue = 20 }) => {
  const sliderTrackEl = useRef<HTMLDivElement>(null);
  const sliderEl = useRef<HTMLDivElement>(null);
  const sliderProgressEl = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(constraintPercentage(defaultValue));

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

    setPercentage(() => {
      return constraintPercentage(nextX);
    });
  };

  return (
    <>
      <div css={containerStyles} onClick={handleSlickTrackClick} {...bind()}>
        <SliderMark value={15} />
        <SliderMark value={50} />
        <SliderMark value={75} />
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
      <div css={{ color: "blue" }}>{percentage}</div>
    </>
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
  backgroundColor: "currentColor",
  outline: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  touchAction: "none",
  userSelect: "none",
  // left: "calc(0% - 7px)",
});