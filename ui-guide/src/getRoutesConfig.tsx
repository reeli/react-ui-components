const req = import.meta.glob("../../packages/ui-core/src/**/__examples__/*.tsx", { eager: true });

export const routesConfig: any[] = Object.keys(req).map((key: string) => {
  const Example: any = Object.values(req[key] as any)[0];
  return {
    path: `/${key.split("/").reverse()[2]}`,
    element: <Example />,
  };
});
