import React from "react";

interface IDemoProps {
  title: string;
}

export const Demo: React.FC<IDemoProps> = ({ title, children }) => (
  <section css={{ marginBottom: "3rem", marginLeft: "2rem" }}>
    <h3 css={{ fontWeight: "normal" }}>{title}</h3>
    {children}
  </section>
);
