import { map } from 'lodash';
import * as React from 'react';

interface IListingData {
  display: string;
  value: string | boolean;
}

interface IListingProps {
  data: IListingData[];
  onItemClick: (e: any, value: string | boolean) => any;
}

export class Listing extends React.Component<IListingProps, any> {
  handleClick = (e: any, value: string | boolean) => {
    this.props.onItemClick(e, value);
  };

  render() {
    const { data } = this.props;
    return (
      <ul>
        {map(data, (item: any, idx: number) => {
          return (
            <li key={idx} onClick={(e: any) => this.handleClick(e, item.value)}>
              {item.display}
            </li>
          );
        })}
      </ul>
    );
  }
}
