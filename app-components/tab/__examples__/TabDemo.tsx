import * as React from 'react';
import {
  Tab,
  TabGroup,
} from '../Tab';

export class TabDemo extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Tab activeIdx={0}>
          <TabGroup header='test1'>
            children1
          </TabGroup>
          <TabGroup header='test2'>
            children2
          </TabGroup>
          <TabGroup header='test3'>
            children3
          </TabGroup>
          <TabGroup header='test4'>
            children4
          </TabGroup>
        </Tab>
      </div>
    );
  }
}
