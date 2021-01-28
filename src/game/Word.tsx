import React from "react";
import { css } from "@emotion/react";

interface IWordProps {
  text: string;
  top: number;
  left: number;
  visible?: boolean;
}

interface IWordState {
  top: number;
  left: number;
}

const wordContainerStyles = css({
  position: "absolute",
});

const wordStyles = css({
  padding: "0 20px",
  height: "30px",
  lineHeight: "30px",
  borderRadius: "5px",
  color: "blue",
  backgroundColor: "#fff",
  textAlign: "center",
  maxWidth: "200px",
});

export class Word extends React.PureComponent<IWordProps, IWordState> {
  render() {
    const { visible = false, top, left, text } = this.props;
    return (
      <div css={[wordContainerStyles, { top, left, opacity: visible ? 1 : 0.5 }]}>
        <div css={wordStyles}>{text}</div>
      </div>
    );
  }
}
