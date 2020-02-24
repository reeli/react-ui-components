import React, { MouseEventHandler } from "react";

interface IModalOverlayProps {
  onClick?: MouseEventHandler;
}

export const TransparentModalOverlay = ({ onClick }: IModalOverlayProps) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }}
  />
);
