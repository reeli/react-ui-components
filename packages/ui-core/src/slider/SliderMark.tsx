import { css } from "@emotion/react";
import { FC } from "react";

const basic = 12;

interface Props {
  value: number;
}

export const SliderMark: FC<Props> = ({ value }) => {
  return (
    <div>
      <div css={[markStyles, markLabelStyles]} style={{ left: `calc(${value}% - ${basic / 2}px)` }}>
        {value}
      </div>
      <div css={[markStyles, markDotStyles]} style={{ left: `calc(${value}% - ${basic/2}px)` }}></div>
    </div>
  );
};


const markStyles = css({
  position: "absolute",
  zIndex:1
});

const markLabelStyles = css({
  marginTop: basic
})

const markDotStyles = css({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: basic,
  height: basic,
  borderRadius: "50%",
  backgroundColor: "currentColor",
  outline: 0,
});
