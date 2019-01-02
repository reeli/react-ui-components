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
    const contentTop = triggerRect.top + triggerRect.height + document.documentElement.scrollTop;

    switch (placement) {
      case Placement.bottomRight:
        position.left =
          triggerRect.left + (triggerRect.width - contentRect.width) + document.documentElement.scrollLeft;
        position.top = contentTop;
        break;
      case Placement.bottomCenter:
        position.left = triggerRect.left + dWidth + document.documentElement.scrollLeft;
        position.top = contentTop;
        break;
      case Placement.bottomLeft:
        position.left = triggerRect.left + document.documentElement.scrollLeft;
        position.top = contentTop;
        break;
    }
  }
  return position;
};

export const usePlacement = ({ triggerRect, contentRect, placement }: IUsePlacementProps): IPosition => {
  // TODO: Add useMemo here
  return getPosition(triggerRect, contentRect, placement);
};
