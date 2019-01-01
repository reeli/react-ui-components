import { useEffect, useState } from "react";

export enum Placement {
  leftCenter,
  rightCenter,
  topLeft,
  topCenter,
  topRight,
  bottomLeft,
  bottomCenter,
  bottomRight,
}

interface IUsePlacementProps {
  triggerRect: ClientRect | null;
  contentRect: ClientRect | null;
  placement: Placement;
}

interface IPosition {
  left: number;
  top: number;
}

const getPosition = (triggerRect: ClientRect | null, contentRect: ClientRect | null, placement: Placement) => {
  let position = {} as IPosition;
  if (triggerRect && contentRect) {
    const dWidth = (triggerRect.width - contentRect.width) / 2;
    switch (placement) {
      case Placement.bottomRight:
        position.top = triggerRect.top + triggerRect.height;
        position.left = triggerRect.left + (triggerRect.width - contentRect.width);
        break;
      case Placement.bottomCenter:
        position.left = triggerRect.left - dWidth;
        position.top = triggerRect.top + triggerRect.height;
        break;
      case Placement.bottomLeft:
        position.left = triggerRect.left;
        position.top = triggerRect.top + triggerRect.height;
        break;
    }
  }
  return position;
};

export const usePlacement = ({ triggerRect, contentRect, placement }: IUsePlacementProps): IPosition => {
  const [position, updatePosition] = useState({ left: 0, top: 0 });
  useEffect(
    () => {
      const position = getPosition(triggerRect, contentRect, placement);
      updatePosition(position);
    },
    [triggerRect, contentRect, placement],
  );
  return position;
};
