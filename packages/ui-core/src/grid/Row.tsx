import { css } from "@emotion/react";
import { FC, PropsWithChildren } from "react";

const rowStyles = css({
  display: "flex",
  width: "100%",
  flexWrap: "wrap",
  boxSizing: "border-box",
});

interface RowProps {
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
}

export const Row: FC<PropsWithChildren<RowProps>> = ({ children, alignItems, justifyContent }) => {
  return <div css={[rowStyles, { alignItems, justifyContent }]}>{children}</div>;
};
