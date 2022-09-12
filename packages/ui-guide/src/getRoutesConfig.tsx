import { map, startsWith, uniqBy } from "lodash";

const req = (require as any).context("@ui/core", true, /\/__examples__\/.*.tsx$/);
const filterDemosByKeys = (keys: string[]) => {
  return keys.filter((key: string) => {
    return key.indexOf("Demo") > -1;
  });
};

const paths = req.keys().filter((key: string) => !startsWith(key, "src/"));

const renderComponent = (Examples: any[]) => [map(Examples, (Example: any, idx: number) => <Example key={idx} />)];

export const routesConfig: any[] = uniqBy(filterDemosByKeys(paths).map((key: string) => {
  return {
    path: `/${key.split("/").reverse()[2]}`,
    element: renderComponent(req(key)),
  };
}), "path");

console.log(routesConfig,'routesConfig');
