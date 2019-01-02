import { css } from "glamor";
import * as React from "react";
import { Tooltip } from "../Tooltip";
import { Placement } from "../../core/usePlacement";

const tooltipsStyles = css({
  position: "absolute",
  zIndex: 1000,
  padding: "8px 0",
  width: 100,
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
});

const tooltipsInnerStyles = css({
  backgroundColor: "#4a4a4a",
  color: "#fff",
  fontSize: "14px",
  padding: ".3rem",
  borderRadius: 4,
});

const arrowUp = css({
  position: "absolute",
  top: 0,
  right: 20,
  marginLeft: "-5px",
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderBottom: "8px solid #4a4a4a",
  width: 0,
  height: 0,
});

const TooltipContent = () => (
  <div {...css(tooltipsStyles)}>
    <div {...arrowUp} />
    <div {...tooltipsInnerStyles}>
      <div>Prompt Text</div>
    </div>
  </div>
);

// const TooltipTrigger = forwardRef((props, ref: Ref<HTMLSpanElement>) => (
//   <span ref={ref} {...css({ display: "inline-block" })} {...props}>
//     Prompt Text
//   </span>
// ));

export class TooltipDemo extends React.Component<any, any> {
  render() {
    return (
      <div {...css({ height: "1000px", marginTop: 200 })}>
        <Tooltip width="330px" placement={Placement.bottomLeft} content={<TooltipContent />}>
          <span {...css({ display: "inline-block" })}>Bottom Left</span>
        </Tooltip>
        <Tooltip width="330px" placement={Placement.bottomCenter} content={<TooltipContent />}>
          <span {...css({ display: "inline-block" })}>Bottom Center</span>
        </Tooltip>
        <Tooltip width="330px" placement={Placement.bottomRight} content={<TooltipContent />}>
          <span {...css({ display: "inline-block", background: "red" })}>Bottom Right</span>
        </Tooltip>
      </div>
    );
  }
}
