import { map } from 'lodash';
import * as React from 'react';

const req = (require as any).context('../app-components', true, /\/__examples__\/.*.tsx$/);


const renderComponent = (Examples: React.Component[]) => {
  return class extends React.Component<any, any> {
    render() {
      return [map(Examples, (Example: any, idx: number) => <Example key={idx} />)]
    }
  };
};

const filterDemosByKeys = (keys: string[]) => {
  return keys.filter((key: string) => {
    return key.indexOf('Demo') > -1;
  })
};

export const routesConfig = filterDemosByKeys(req.keys()).map((key: string) => {
  return {
    path: `/${key.split('/').reverse()[2]}`,
    component: renderComponent(req(key)),
  };
});