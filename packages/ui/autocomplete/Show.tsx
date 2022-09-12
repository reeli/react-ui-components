export function genShowFunc<T extends (...args: any[]) => boolean>(func: T) {
  return func;
}

export const Show: React.FunctionComponent<{ onlyShowWhen?: boolean; displayNodeWhenHide?: React.ReactNode }> = ({
  onlyShowWhen,
  children,
  displayNodeWhenHide = null,
}) => <>{onlyShowWhen ? children : displayNodeWhenHide}</>;
