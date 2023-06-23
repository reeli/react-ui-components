export const CSSPropertyGetter = <T extends Record<string, any>>(): { [K in keyof T]: T[K] } => {
  return new Proxy({} as T, {
    get(_, k) {
      return k;
    },
  });
};
