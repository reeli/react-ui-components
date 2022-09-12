import { map } from "lodash";
import { Component } from "react";

export interface IListingItem {
  display: string;
  value: string;
}

export interface IListingProps {
  data: IListingItem[];
  onItemClick: (e: any, item: IListingItem) => any;
}

export class Listing extends Component<IListingProps, any> {
  handleClick = (e: any, item: IListingItem) => {
    this.props.onItemClick(e, item);
  };

  render() {
    const { data } = this.props;
    return (
      <ul>
        {map(data, (item: any, idx: number) => {
          return (
            <li key={idx} onClick={(e: any) => this.handleClick(e, item)}>
              {item.display}
            </li>
          );
        })}
      </ul>
    );
  }
}
