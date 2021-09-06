import React from "react";
import { OverlayTrigger } from "src/core/components/OverlayTrigger";
import { Input } from "../input/Input";
import { IListingItem, IListingProps, Listing } from "../listing/Listing";
import { Placement, useToggle } from "src/core";
import { ClickAwayListener } from "src/core/components/ClickAwayListener";

export interface ISelectProps extends IListingProps {
  value: string;
  placeholder?: string;
}

export const Select: React.FC<ISelectProps> = ({ placeholder, data, value, onItemClick }) => {
  const [visible, open, close] = useToggle();
  const handleItemClick = (e: React.MouseEvent<any>, item: IListingItem) => {
    onItemClick(e, item);
    close();
  };

  return (
    <OverlayTrigger
      content={
        <ClickAwayListener onClickAway={close}>
          <div>
            <Listing
              data={data}
              onItemClick={(e, item) => {
                handleItemClick(e, item);
              }}
            />
          </div>
        </ClickAwayListener>
      }
      placement={Placement.bottomLeft}
      visible={visible}
    >
      <Input value={value} placeholder={placeholder} onClick={open} readOnly={true} name={""} />
    </OverlayTrigger>
  );
};
