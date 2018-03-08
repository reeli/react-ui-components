import * as React from 'react';
import { Component } from 'react';

export class AccordionGroup extends Component<any, any> {
  render() {
    const { header, children } = this.props;
    return <div>
      {header && <div>{header}</div>}
      <div>{children}</div>
    </div>;
  }
}