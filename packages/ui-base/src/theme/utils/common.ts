import { capitalize } from "lodash";

export const getColorByBackgroundColor = (bgColor: string, color: Record<string, string>) => {
  if (bgColor?.startsWith("surface")) {
    return color["onSurface"];
  }
  return (color as any)[`on${capitalize(bgColor)}`];
};
