import { FC, PropsWithChildren } from "react";

export const ModalHeader: FC<PropsWithChildren> = ({ children }) => (
  <div css={{ display: "flex", padding: "1.5rem", justifyContent: "space-between" }}>{children}</div>
);
