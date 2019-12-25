import { css } from "glamor";
import React, { Component } from "react";

interface ICell {
  label?: string | JSX.Element | null;
  value?: string | JSX.Element | null;
}

const cellValueStyles = css({
  flexShrink: 0,
  wordWrap: "break-word",
});

export class Cell extends Component<ICell, any> {
  render() {
    const { value, label } = this.props;
    return (
      <div {...cellValueStyles}>
        {label ? label : null}
        {value ? <div>{value}</div> : null}
      </div>
    );
  }
}
