import { FC } from "react";

export const ModalFooter: FC = ({ children }) => (
  <div
    css={{
      display: "flex",
      padding: "0.5rem 1.5rem 1rem",
      justifyContent: "flex-end",
    }}
  >
    {children}
  </div>
);
