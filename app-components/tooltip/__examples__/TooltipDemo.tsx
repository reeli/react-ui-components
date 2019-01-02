import { css } from "glamor";
import * as React from "react";
import { Tooltip } from "../Tooltip";
import { Placement } from "../../core/usePlacement";
import { Button } from "../../button/Button";

const tooltipsStyles = css({
  // position: "absolute", // can not set absolute here
  position: "relative",
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
  textAlign: "center",
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

const centerStyles = css({
  left: "50%",
});

const leftStyels = css({
  left: 20,
});

const rightStyles = css({
  right: 20,
});

const TooltipContent = ({ placement = "left" }: { placement?: "center" | "left" | "right" }) => (
  <div {...css(tooltipsStyles)}>
    <div
      {...arrowUp}
      {...placement === "center" && centerStyles}
      {...placement === "left" && leftStyels}
      {...placement === "right" && rightStyles}
    />
    <div {...tooltipsInnerStyles}>
      <div>Prompt Text</div>
    </div>
  </div>
);

export class TooltipDemo extends React.Component<any, any> {
  render() {
    return (
      <div {...css({ height: "1000px", marginTop: 200 })}>
        <span style={{ marginRight: 15 }}>
          <Tooltip placement={Placement.bottomLeft} content={<TooltipContent placement={"left"} />}>
            <Button>On Bottom Left</Button>
          </Tooltip>
        </span>
        <span style={{ marginRight: 15 }}>
          <Tooltip placement={Placement.bottomCenter} content={<TooltipContent placement={"center"} />}>
            <Button>On Bottom Center</Button>
          </Tooltip>
        </span>
        <span style={{ marginRight: 15 }}>
          <Tooltip placement={Placement.bottomRight} content={<TooltipContent placement={"right"} />}>
            <Button>On Bottom Right</Button>
          </Tooltip>
        </span>
      </div>
    );
  }
}
