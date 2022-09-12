import { FC, useState, useEffect } from "react";
import { Portal } from "../portal";
import { css } from "@emotion/react";

const containerStyles = css({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%, -50%, 0)",
  zIndex: 999,
  background: "rgba(0,0,0,0.5)",
  padding: 16,
  borderRadius: 4,
});

export const Toast: FC<{ duration?: number; onClose?: () => void }> = ({ children, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timeId = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, duration);

    return () => {
      if (timeId) {
        clearTimeout(timeId);
      }
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Portal>
      <div css={containerStyles}>{children}</div>
    </Portal>
  );
};
