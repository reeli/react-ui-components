import React from "react";

export const ModalHeader: React.FC = ({ children }) => (
  <div css={{ display: "flex", padding: "1.5rem", justifyContent: "space-between" }}>{children}</div>
);
