import { css } from "@emotion/react";
import { FC } from "react";

const basic = 12;

interface Props {
  value: number;
  label?: string;
}

export const SliderMark: FC<Props> = ({ value, label }) => {
  return (
    <div css={markDotStyles} style={{ left: `calc(${value}% - ${basic / 2}px)` }}>
      <div css={markLabelStyles}>{label || value}</div>
    </div>
  );
};

const markLabelStyles = css({
  marginTop: basic * 2,
});

const markDotStyles = css({
  position: "absolute",
  zIndex: 1,
  top: "50%",
  transform: "translateY(-50%)",
  width: basic,
  height: basic,
  borderRadius: "50%",
  backgroundColor: "red",
  outline: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
