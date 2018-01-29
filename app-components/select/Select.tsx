import * as React from 'react';
import { Input } from '../input/Input';
import { IListingItem, IListingProps, Listing } from '../listing/Listing';
import { IPortalInnerProps, Portal } from '../portal/Portal';

interface ISelectProps extends IListingProps {
  value: string;
  placeholder?: string;
}

interface ISelectState {
  value: string;
}

export class Select extends React.Component<ISelectProps, ISelectState> {
  handleItemClick = (e: React.MouseEvent<any>, item: IListingItem, close: IPortalInnerProps['close']) => {
    this.props.onItemClick(e, item);
    close(e);
  };

  render() {
    const { placeholder, data, value } = this.props;

    return (
      <Portal
        triggerOn={({ open }) => {
          return <Input value={value} placeholder={placeholder} onClick={open} readOnly={true} />;
        }}
        onOutSideClick
      >
        {({ close }) => (
          <Listing
            data={data}
            onItemClick={(e, item) => {
              this.handleItemClick(e, item, close);
            }}
          />
        )}
      </Portal>
    );
  }
}
