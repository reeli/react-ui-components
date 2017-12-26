import { map } from 'lodash';
import * as React from 'react';

interface IListingData {
  display: string;
  value: string | boolean;
}

interface IListingProps {
  data: IListingData[];
  onItemClick: (value: string | boolean) => any;
}

export class Listing extends React.Component<IListingProps, any> {
  handleClick = (value: string | boolean) => {
    this.props.onItemClick(value);
  };

  render() {
    const { data } = this.props;
    return (
      <ul>
        {map(data, (item: any, idx: number) => {
          return (
            <li key={idx} onClick={() => this.handleClick(item.value)}>
              {item.display}
            </li>
          );
        })}
      </ul>
    );
  }
}
