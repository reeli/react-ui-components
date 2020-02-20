import React from "react";
import { Portal } from "../portal";

const modalStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
} as any;

interface IModalProps {
  isOpen: boolean;
}

export const Modal: React.FC<IModalProps> = ({ children, isOpen }) => {
  return isOpen ? (
    <Portal>
      <div style={modalStyles}>{children}</div>
    </Portal>
  ) : null;
};
