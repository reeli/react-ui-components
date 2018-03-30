import { css } from 'glamor';
import * as React from 'react';
import { Component } from 'react';

interface ITooltip {
  width?: string;
}

const tooltipStyles = css({
  position: 'absolute',
  zIndex: 1000,
  padding: '8px 0',
});

const tooltipInnerStyles = css({
  backgroundColor: '#4a4a4a',
  color: '#fff',
  fontSize: '14px',
  padding: '.3rem',
});

const arrowUp = css({
  position: 'absolute',
  top: 0,
  left: '10%',
  marginLeft: '-5px',
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent',
  borderBottom: '8px solid #4a4a4a',
  width: 0,
  height: 0,
});

export class Tooltip extends Component<ITooltip, any> {
  render() {
    const { width } = this.props;
    return (
      <div {...css(tooltipStyles, { width })}>
        <div {...arrowUp} />
        <div {...tooltipInnerStyles}>{this.props.children}</div>
      </div>
    );
  }
}
