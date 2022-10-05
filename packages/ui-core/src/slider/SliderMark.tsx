import { css } from "@emotion/react";
import { FC } from "react";
import { calcPercentage } from "./utils";

interface Props {
  value: number;
  max?: number;
  label?: string | number;
  showDot?: boolean;
  sliderOffset?: number;
}

export const SliderMark: FC<Props> = ({ value, max = 100, label, showDot = true, sliderOffset = 12 }) => {
  return (
    <div
      css={[
        markDotStyles,
        { backgroundColor: showDot ? "currentColor" : "none", width: sliderOffset, height: sliderOffset },
      ]}
      style={{ left: `calc(${calcPercentage(value, max)}% - ${sliderOffset / 2}px)` }}
    >
      <div css={{ marginTop: sliderOffset * 2 }}>{label}</div>
    </div>
  );
};

const markDotStyles = css({
  position: "absolute",
  zIndex: 1,
  top: "50%",
  transform: "translateY(-50%)",
  borderRadius: "50%",
  outline: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
