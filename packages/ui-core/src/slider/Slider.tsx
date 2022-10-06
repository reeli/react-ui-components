import { css } from "@emotion/react";
import { FC } from "react";
import { SliderProps, useSlider } from "./";
import { noop } from "lodash";

// 1. css() 方法会创建一个 className， append 到 style 里面，因此对于动态计算的样式，最好放到 inline style 属性上，避免频繁的创建 css class（每当属性发生变化都会创建新的 class？如果样式属性不变，那么 re-render 时应该不会重新创建新的 class?）
// 2. css point-event: none 表示鼠标事件“穿透”该元素并且指定该元素“下面”的任何东西

// TODO: 增大 click 进度条时候的点击区域(增加一个透明背景层)

const basic = 12;

export const Slider: FC<SliderProps> = ({
  step = 1,
  min = 0,
  max = 100,
  defaultValue,
  sliderValue,
  onChange = noop,
  children,
}) => {
  const { bind, sliderTrackEl, sliderFilledTrackEl, sliderEl, value } = useSlider({
    min,
    max,
    defaultValue,
    sliderValue,
    step,
    onChange,
    sliderOffset: basic,
  });

  return (
    <div css={containerStyles} {...bind()}>
      {children}
      <div css={sliderTrackStyles} ref={sliderTrackEl}>
        <div css={sliderFilledTrackStyles} ref={sliderFilledTrackEl}></div>
      </div>
      <div css={sliderStyles} ref={sliderEl} role={"slider"}></div>
      <input type={"hidden"} value={value} />
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
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  // left: "calc(0% - 7px)",
});
