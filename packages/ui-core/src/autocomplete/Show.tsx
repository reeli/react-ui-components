import { FC, ReactNode, PropsWithChildren } from "react";

export function genShowFunc<T extends (...args: any[]) => boolean>(func: T) {
  return func;
}

export const Show: FC<PropsWithChildren<{ onlyShowWhen?: boolean; displayNodeWhenHide?: ReactNode }>> = ({
  onlyShowWhen,
  children,
  displayNodeWhenHide = null,
}) => <>{onlyShowWhen ? children : displayNodeWhenHide}</>;
