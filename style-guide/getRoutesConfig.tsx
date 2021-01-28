import { map, startsWith } from "lodash";
import * as React from "react";

const req = (require as any).context("../src", true, /\/__examples__\/.*.tsx$/);

const renderComponent = (Examples: React.Component[]) => {
  return class extends React.Component<any, any> {
    render() {
      return [map(Examples, (Example: any, idx: number) => <Example key={idx} />)];
    }
  };
};

const filterDemosByKeys = (keys: string[]) => {
  return keys.filter((key: string) => {
    return key.indexOf("Demo") > -1;
  });
};

const paths = req.keys().filter((key: string) => !startsWith(key, "src/"));

export const routesConfig = filterDemosByKeys(paths).map((key: string) => {
  return {
    path: `/${key.split("/").reverse()[2]}`,
    component: renderComponent(req(key)),
  };
});
