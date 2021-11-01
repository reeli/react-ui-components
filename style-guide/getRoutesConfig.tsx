import { map, startsWith } from "lodash";

const req = (require as any).context("../src", true, /\/__examples__\/.*.tsx$/);

const renderComponent = (Examples: any[]) => {
  return () => [map(Examples, (Example: any, idx: number) => <Example key={idx} />)];
};

const filterDemosByKeys = (keys: string[]) => {
  return keys.filter((key: string) => {
    return key.indexOf("Demo") > -1;
  });
};

const paths = req.keys().filter((key: string) => !startsWith(key, "src/"));

export const routesConfig: any[] = filterDemosByKeys(paths).map((key: string) => {
  return {
    path: `/${key.split("/").reverse()[2]}`,
    component: renderComponent(req(key)),
  };
});
