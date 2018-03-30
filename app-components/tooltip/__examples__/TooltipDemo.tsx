import * as React from 'react';
import { Tooltip } from '../Tooltip';

export class TooltipDemo extends React.Component<any, any> {
  render() {
    return (
      <Tooltip width='330px'>
        Purchase or reload your card, get ¥10 extra!
      </Tooltip>
    );
  }
}
