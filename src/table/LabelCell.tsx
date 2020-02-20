import React from "react";
import { css } from "@emotion/core";

interface ILabelCell {
  label?: string;
  labelRender?: () => JSX.Element | null;
}

const labelStyles = css({
  fontSize: "1.4rem",
  fontWeight: "bold",
  lineHeight: 1.71,
  color: "rgba(0, 0, 0, 0.87)",
  wordWrap: "break-word",
});

export const LabelCell = ({ label, labelRender }: ILabelCell) => {
  return labelRender ? <div css={labelStyles}>{labelRender()}</div> : <div css={labelStyles}>{label ? label : ""}</div>;
};
