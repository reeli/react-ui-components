export enum Placement {
  left,
  leftTop,
  leftBottom,
  right,
  rightTop,
  rightBottom,
  top,
  topLeft,
  topRight,
  bottom,
  bottomLeft,
  bottomRight,
  over,
}

interface IPosition {
  left: number;
  top: number;
}

interface IUsePlacementProps {
  triggerRect: ClientRect | null;
  contentRect: ClientRect | null;
  placement: Placement;
}

const getPosition = (triggerRect: ClientRect | null, contentRect: ClientRect | null, placement: Placement) => {
  let position = {
    top: document.documentElement.scrollTop,
    left: document.documentElement.scrollLeft,
  } as IPosition;
  if (triggerRect && contentRect) {
    const dWidth = triggerRect.width - contentRect.width;
    const dHeight = triggerRect.height - contentRect.height;

    switch (placement) {
      case Placement.top:
        position.left += triggerRect.left + dWidth / 2;
        position.top += triggerRect.top - triggerRect.height;
        break;
      case Placement.topLeft:
        position.left += triggerRect.left;
        position.top += triggerRect.top - triggerRect.height;
        break;
      case Placement.topRight:
        position.left += triggerRect.left + dWidth;
        position.top += triggerRect.top - triggerRect.height;
        break;
      case Placement.bottom:
        position.left += triggerRect.left + dWidth / 2;
        position.top += triggerRect.top + triggerRect.height;
        break;
      case Placement.bottomLeft:
        position.left += triggerRect.left;
        position.top += triggerRect.top + triggerRect.height;
        break;
      case Placement.bottomRight:
        position.left += triggerRect.left + dWidth;
        position.top += triggerRect.top + triggerRect.height;
        break;
      case Placement.left:
        position.left += triggerRect.left - contentRect.width;
        position.top += triggerRect.top + dHeight / 2;
        break;
      case Placement.leftTop:
        position.left += triggerRect.left - contentRect.width;
        position.top += triggerRect.top;
        break;
      case Placement.leftBottom:
        position.left += triggerRect.left - contentRect.width;
        position.top += triggerRect.top + dHeight;
        break;
      case Placement.right:
        position.left += triggerRect.left + triggerRect.width;
        position.top += triggerRect.top + dHeight / 2;
        break;
      case Placement.rightTop:
        position.left += triggerRect.left + triggerRect.width;
        position.top += triggerRect.top;
        break;
      case Placement.rightBottom:
        position.left += triggerRect.left + triggerRect.width;
        position.top += triggerRect.top + dHeight;
        break;
      // case Placement.rightAuto:  把 trigger.left 和 clientWidth 作比较，如果大于 clientWith/2，证明它在右边，应该显示在左面
      //   position.left += triggerRect.left + triggerRect.width;
      //   position.top += triggerRect.top + dHeight;
      case Placement.over:
        position.left = triggerRect.left;
        position.top = triggerRect.top;
        break;
    }
  }
  return position;
};

export const getPlacement = ({ triggerRect, contentRect, placement }: IUsePlacementProps): IPosition =>
  getPosition(triggerRect, contentRect, placement);
