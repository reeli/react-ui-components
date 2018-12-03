import * as React from 'react';
import { IncreasingNumber } from '../index';

export class IncreasingNumberDemo extends React.Component<any, any> {
  render() {
    return (
      <IncreasingNumber totalNumber={100} totalTime={10000}>
        {({ increasingNumber }) => <div>{increasingNumber}</div>}
      </IncreasingNumber>
    );
  }
}
