import { css } from 'glamor';
import * as React from 'react';
import { Component } from 'react';

interface ICell {
  label?: string | JSX.Element | null;
  value?: string | JSX.Element | null;
}

const cellValueStyles = css({
  borderTop: '1px solid rgba(0, 0, 0, 0.12)',
  padding: '2rem 0',
});

export class Cell extends Component<ICell, any> {
  render() {
    const { value, label } = this.props;
    return (
      <div>
        {label ? label : null}
        {value ? <div {...cellValueStyles}>{value}</div> : null}
      </div>
    );
  }
}
