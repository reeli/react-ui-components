import React, { FunctionComponent, ReactNode } from "react";
import { BasicPortal } from "../portal/BasicPortal";

const Overlay = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: "rgba(0,0,0,0.65)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    }}
    onClick={close}
  />
);

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
  children: ReactNode;
  BackdropComponent?: FunctionComponent;
}

export const Modal = ({ children, isOpen, BackdropComponent = Overlay }: IModalProps) => {
  return isOpen ? (
    <BasicPortal>
      <div style={modalStyles}>
        <BackdropComponent />
        {children}
      </div>
    </BasicPortal>
  ) : null;
};
