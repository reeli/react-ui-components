import React, { HTMLAttributes } from "react";
import { Tooltip } from "../Tooltip";
import { Placement } from "src/core";
import { Button } from "src/button";
import { css } from "@emotion/core";
import { Demo } from "style-guide/components/Demo";
import { animated, useTransition } from "react-spring";
import { useTooltip } from "src/tooltip/useTooltip";

export function TooltipDemo() {
  return (
    <Demo title={"Simple Tooltip"}>
      <Tooltip placement={Placement.bottomLeft} content={<div>Some Hint</div>}>
        <Button>Hover me</Button>
      </Tooltip>
    </Demo>
  );
}

export function TooltipDemo2() {
  return (
    <Demo title={"Customize Tooltip"}>
      <Tooltip placement={Placement.bottomLeft} content={<TooltipContent placement={"left"} />}>
        <Button>Hover me</Button>
      </Tooltip>
    </Demo>
  );
}

export function TooltipDemo3() {
  const [Trigger, Content, , , isOpen] = useTooltip();
  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
  });

  return (
    <Demo title={"Tooltip with Animation"}>
      <Trigger>
        <Button>Hover me</Button>
      </Trigger>
      {transitions.map(
        ({ item, key, props: styles }) =>
          item && (
            <Content key={key}>
              <TooltipContent style={styles} placement={"right"} />
            </Content>
          ),
      )}
    </Demo>
  );
}

export function TooltipDemo4() {
  const [Trigger, Content, , , visible] = useTooltip();
  return (
    <Demo title={"Tooltip with Multiple Triggers"}>
      <Trigger>
        <div>
          <p>trigger1</p>
          <p>trigger2</p>
          <p>trigger3</p>
        </div>
      </Trigger>
      {visible && (
        <Content>
          <TooltipContent placement={"right"} />
        </Content>
      )}
    </Demo>
  );
}

export function TooltipDemo5() {
  return (
    <Demo title={"Tooltip with Scroll"}>
      <div style={{ height: 800, background: "#fcfcfc", overflow: "scroll" }}>
        <Tooltip placement={Placement.bottomLeft} content={<TooltipContent placement={"right"} />}>
          <Button>Hover me</Button>
        </Tooltip>
      </div>
    </Demo>
  );
}

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

const leftStyles = css({
  left: 20,
});

const rightStyles = css({
  right: 20,
});

type TPlacement = "center" | "left" | "right";

const getStyles = (placement: TPlacement) => {
  if (placement === "center") {
    return centerStyles;
  }
  if (placement === "left") {
    return leftStyles;
  }
  if (placement === "right") {
    return rightStyles;
  }
  return leftStyles;
};

const TooltipContent = ({ placement = "left", ...otherProps }: { placement?: TPlacement } & HTMLAttributes<any>) => (
  <animated.div css={tooltipsStyles} data-role="tooltip" {...otherProps}>
    <div css={[arrowUp, getStyles(placement)]} />
    <div css={tooltipsInnerStyles}>
      <div>Some Hint</div>
    </div>
  </animated.div>
);
