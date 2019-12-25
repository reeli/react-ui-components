import { css } from "glamor";
import React from "react";

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
  return labelRender ? <div {...labelStyles}>{labelRender()}</div> : <div {...labelStyles}>{label ? label : ""}</div>;
};
