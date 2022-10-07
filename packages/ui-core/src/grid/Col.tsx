import { FC, PropsWithChildren } from "react";
import { css } from "@emotion/react";

interface ColProps {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const breakpoints: { [index: string]: number } = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const data = Object.keys(breakpoints).reduce((result, key) => {
  return {
    ...result,
    [key]: `@media (min-width: ${breakpoints[key]}px)`,
  };
}, {} as { [k: string]: string });

// 1. media query，用 min-width 而不是 max-width，当屏幕变大之后，布局不变
// 2. 12 栅格布局，每个 item 的宽度等于 percentage/12，比如 1/12
// 3. box-sizing: border-box
// 4. js mediaQueryMatch

const mq = (size: string, width: string) => {
  return `${data[size]} { flex-basis: ${width}%; flex-grow: 0; min-width: ${width}%; }`;
};

const GRID_SIZE = 12;
const getColWidth = (item: number) => ((item / GRID_SIZE) * 100).toFixed(6);

const containerStyles = ({ sm, md, lg, xl }: ColProps) => css`
  ${sm && `${mq("sm", getColWidth(sm))}`}
  ${md && `${mq("md", getColWidth(md))}`}
  ${lg && `${mq("lg", getColWidth(lg))}`}
  ${xl && `${mq("xl", getColWidth(xl))}`}
`;

export const Col: FC<PropsWithChildren<ColProps>> = ({ children, sm, md, lg, xl }) => {
  return <div css={containerStyles({ sm, md, lg, xl })}>{children}</div>;
};
