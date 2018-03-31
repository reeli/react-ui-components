import * as React from 'react';
import {
  OverlayTrigger,
  Placement,
} from '../core/OverlayTrigger';
import { Input } from '../input/Input';
import {
  IListingItem,
  IListingProps,
  Listing,
} from '../listing/Listing';
import { IPortalPropsInnerProps, } from '../portal/Portal';

interface ISelectProps extends IListingProps {
  value: string;
  placeholder?: string;
}

interface ISelectState {
  value: string;
}

export class Select extends React.Component<ISelectProps, ISelectState> {
  handleItemClick = (e: React.MouseEvent<any>, item: IListingItem, close: IPortalPropsInnerProps['close']) => {
    this.props.onItemClick(e, item);
    close();
  };

  render() {
    const { placeholder, data, value } = this.props;

    return (
      <OverlayTrigger
        content={({ close }) => (
          <Listing
            data={data}
            onItemClick={(e, item) => {
              this.handleItemClick(e, item, close);
            }}
          />
        )}
        placement={Placement.leftBottom}
        closeOnOutSide
      >
        {({ open }) => {
          return <Input value={value} placeholder={placeholder} onClick={open} readOnly={true} />;
        }}
      </OverlayTrigger>
    );
  }
}
