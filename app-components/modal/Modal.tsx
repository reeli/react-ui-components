import React, { FunctionComponent, MouseEventHandler, ReactNode } from "react";
import { BasicPortal } from "../portal/BasicPortal";

interface IBackdropProps {
  onBackDropClick?: MouseEventHandler;
}

const Backdrop = ({ onBackDropClick }: IBackdropProps) => (
  <div
    onClick={onBackDropClick}
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

const modalStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
} as any;

interface IModalProps extends IBackdropProps {
  isOpen: boolean;
  children: ReactNode;
  BackdropComponent?: FunctionComponent<any>;
}

export const Modal = ({ children, isOpen, onBackDropClick, BackdropComponent = Backdrop }: IModalProps) => {
  return isOpen ? (
    <BasicPortal>
      <div style={modalStyles}>
        <BackdropComponent onBackDropClick={onBackDropClick} />
        {children}
      </div>
    </BasicPortal>
  ) : null;
};
