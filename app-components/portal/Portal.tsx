import React, { ReactNode, useEffect, useRef, useState } from "react";
import { BasicPortal } from "./BasicPortal";

interface IPortalInnerProps {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
}

interface IPortalProps {
  content: (props: IPortalInnerProps) => ReactNode;
  children: (props: IPortalInnerProps) => ReactNode;
  isOpen?: boolean;
  onBeforeClose?: (props: IPortalInnerProps) => void;
  closeOnOutsideClick?: boolean;
}

export const usePortal = ({ openState = false }: { openState: boolean | undefined }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(
    () => {
      setOpen(openState);
    },
    [openState],
  );

  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen(!isOpen),
    isOpen,
  } as IPortalInnerProps;
};

export const Portal = ({ onBeforeClose, isOpen, closeOnOutsideClick, children, content }: IPortalProps) => {
  const innerProps = usePortal({ openState: isOpen });

  const triggerEl = useRef(null);
  const contentEl = useRef(null);

  const handleOutSideClick = (evt: Event) => {
    const node = triggerEl.current! as any;
    if (!node.contains(evt.target)) {
      innerProps.close();
    }
  };

  // Equal as componentWillMount
  useEffect(() => {
    if (closeOnOutsideClick) {
      document.addEventListener("click", handleOutSideClick);
    }
  }, []);

  // Equal as componentWillUnmount
  useEffect(() => {
    return function cleanup() {
      if (closeOnOutsideClick) {
        document.removeEventListener("click", handleOutSideClick);
      }
    };
  });

  // Equal as componentDidUpdate
  useEffect(
    () => {
      if (onBeforeClose) {
        onBeforeClose(innerProps);
      }
    },
    [innerProps.isOpen],
  );

  return (
    <>
      <div ref={triggerEl}>{children(innerProps)}</div>
      {innerProps.isOpen ? (
        <div ref={contentEl}>
          <BasicPortal children={content(innerProps)} />
        </div>
      ) : null}
    </>
  );
};
