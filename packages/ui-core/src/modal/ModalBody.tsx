import { FC, PropsWithChildren } from "react";

export const ModalBody: FC<PropsWithChildren> = ({ children }) => (
  <div css={{ padding: "0.5rem 1.5rem 1rem" }}>{children}</div>
);
