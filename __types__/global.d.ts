import { InterpolationWithTheme } from "@emotion/core";

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: InterpolationWithTheme<TTheme>;
    }
  }
}
