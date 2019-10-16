import { css } from "glamor";
import * as React from "react";
import { Component } from "react";

interface IAccordionProps {
  children: [JSX.Element];
}

export class Accordion extends Component<IAccordionProps, any> {
  state = {
    currentIdx: 0,
  };

  handleClick = (currentIdx: number) => {
    this.setState({
      currentIdx,
    });
  };

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, (item, index) => {
          const expanded = this.state.currentIdx === index;
          return (
            <div>
              <div
                onClick={() => {
                  this.handleClick(index);
                }}
                {...css({ cursor: "pointer" })}
              >
                {item.props.header}
              </div>
              <div
                {...css({
                  display: expanded ? "block" : "none",
                  height: expanded ? "auto" : 0,
                  transition: "height .2s",
                })}
              >
                {item.props.children}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
