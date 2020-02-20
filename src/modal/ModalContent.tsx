import React from "react";

export const ModalContent: React.FC = ({ children }) => {
  return (
    <div
      style={{
        background: "#fff",
        padding: 25,
        borderRadius: 4,
        position: "absolute",
        zIndex: 1000,
        top: "50%",
        left: "50%",
        transform: "translate3d(-50%,-50%,0)",
      }}
    >
      {children}
    </div>
  );
};
