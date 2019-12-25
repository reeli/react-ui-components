import { Portal } from "./Portal";
import React, { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { usePosition } from "./hooks/usePosition";
import { Placement } from "./utils/getPlacement";
import { isEqual } from "lodash";

interface IOverlayTriggerProps {
  children: ReactElement<any>;
  content?: ReactNode;
  visible?: boolean;
}

export const OverlayTrigger = ({ children, content, visible = false }: IOverlayTriggerProps) => {
  const triggerEl = useRef<HTMLDivElement>(null);
  const contentEl = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(visible);
  const isOpenRef = useRef(isOpen);

  const position = usePosition(triggerEl, contentEl, Placement.bottomLeft, [isOpen]);

  useEffect(() => {
    isOpenRef.current = isOpen;
  });

  useEffect(
    () => {
      if (!isEqual(visible, isOpenRef.current)) {
        setIsOpen(visible);
      }
    },
    [visible],
  );

  return (
    <>
      {React.cloneElement(React.Children.only(children), {
        ref: triggerEl,
      })}
      {isOpen && (
        <Portal>
          <div
            ref={contentEl}
            style={{
              position: "absolute",
              left: position.left,
              top: position.top,
              zIndex: 1500,
            }}
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
};
