import React, { MouseEventHandler } from "react";

interface IModalOverlayProps {
  onClick?: MouseEventHandler;
}

export const ModalOverlay = ({ onClick }: IModalOverlayProps) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: "rgba(0,0,0,0.65)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    }}
  />
);
