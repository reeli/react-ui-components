import { ReactNode, useRef } from "react";
import { Placement } from "../utils/getPlacement";
import { useToggle } from "../hooks/useToggle";
import { Portal } from "../portal";
import { Position } from "./Position";

interface IOverlayTriggerProps {
  placement?: Placement;
  trigger: (props: any) => ReactNode;
  content: (props: any) => ReactNode;
}

export const Overlay = ({ trigger, content, placement = Placement.bottomLeft }: IOverlayTriggerProps) => {
  const triggerEl = useRef(null);
  const [isOpen, open, close] = useToggle();

  return (
    <>
      {trigger({ open, close, triggerEl })}
      {isOpen ? (
        <Portal
          children={
            <Position triggerRef={triggerEl} placement={placement}>
              {content({ open, close })}
            </Position>
          }
        />
      ) : null}
    </>
  );
};
