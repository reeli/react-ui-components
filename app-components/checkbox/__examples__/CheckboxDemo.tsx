import * as React from 'react';
import { Checkbox } from '../Checkbox';

export class CheckboxDemo extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Checkbox value={true} onChange={(value) => {
          console.log(value);
        }} />
      </div>
    );
  }
}
