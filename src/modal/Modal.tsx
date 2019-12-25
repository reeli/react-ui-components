import React, { FunctionComponent, MouseEventHandler } from "react";
import { Portal } from "../portal";

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
  BackdropComponent?: FunctionComponent<IBackdropProps>;
}

export const Modal: React.FC<IModalProps> = ({ children, isOpen, onBackDropClick, BackdropComponent = Backdrop }) => {
  return isOpen ? (
    <Portal>
      <div style={modalStyles}>
        <BackdropComponent onBackDropClick={onBackDropClick} />
        {children}
      </div>
    </Portal>
  ) : null;
};
