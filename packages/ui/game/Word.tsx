import { css } from "@emotion/react";

interface IWordProps {
  text: string;
  top: number;
  left: number;
  visible?: boolean;
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

export function Word(props: IWordProps) {
  const { visible = false, top, left, text } = props;
  return (
    <div css={[wordContainerStyles, { top, left, opacity: visible ? 1 : 0.5 }]}>
      <div css={wordStyles}>{text}</div>
    </div>
  );
}
