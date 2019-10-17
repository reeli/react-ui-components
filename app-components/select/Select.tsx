import React from "react";
import { OverlayTrigger } from "../core/OverlayTrigger";
import { Input } from "../input/Input";
import { IListingItem, IListingProps, Listing } from "../listing/Listing";
import { Placement, useToggle } from "app-components/core";

export interface ISelectProps extends IListingProps {
  value: string;
  placeholder?: string;
}

export const Select: React.FC<ISelectProps> = ({ placeholder, data, value, onItemClick }) => {
  const [, open, close] = useToggle();
  const handleItemClick = (e: React.MouseEvent<any>, item: IListingItem) => {
    onItemClick(e, item);
    close();
  };

  return (
    <OverlayTrigger
      content={
        <Listing
          data={data}
          onItemClick={(e, item) => {
            handleItemClick(e, item);
          }}
        />
      }
      placement={Placement.bottomLeft}
      closeOnClickOutSide
    >
      <Input value={value} placeholder={placeholder} onClick={open} readOnly={true} />
    </OverlayTrigger>
  );
};
