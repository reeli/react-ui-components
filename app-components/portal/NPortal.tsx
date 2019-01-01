import React, { ReactNode } from "react";
import { BasicPortal } from "./BasicPortal";

interface IPortalProps {
  children: ReactNode;
  isOpen?: boolean;
}

export const NPortal = ({ isOpen, children }: IPortalProps) => {
  return isOpen ? <BasicPortal children={children} /> : null;
};
