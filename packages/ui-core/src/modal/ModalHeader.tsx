import { FC } from "react";

export const ModalHeader: FC = ({ children }) => (
  <div css={{ display: "flex", padding: "1.5rem", justifyContent: "space-between" }}>{children}</div>
);
