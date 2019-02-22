import React, { Component } from "react";
import { get, map } from "lodash";

const list = [
  {
    id: "001",
    city: "Chengdu",
  },
  {
    id: "002",
    city: "Beijing",
  },
  {
    id: "003",
    city: "Shanghai",
  },
  {
    id: "004",
    city: "Chongqing",
  },
];

const swap = (list: any[], first: any, second: any) => {
  const temp: any = [];

  list.map((item, idx) => {
    if (item.id === first.id) {
      temp[idx] = second;
    } else if (item.id === second.id) {
      temp[idx] = first;
    } else {
      temp[idx] = item;
    }
  });

  return temp;
};

export class DragAndDrop extends Component {
  state = {
    draggedItem: null,
    targetItem: null,
    list,
  };

  handleCityDrop = (_: any, item: any) => {
    const nextList = swap(this.state.list, item, this.state.draggedItem);
    this.setState({
      draggedItem: null,
      targetItem: null,
      list: nextList,
    });
  };

  handleCityDragStart = (_: any, item: any) => {
    this.setState({
      draggedItem: item,
    });
  };

  handleCityDragOver = (e: React.DragEvent, item: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    this.setState({
      targetItem: item,
    });
  };

  render() {
    return (
      <div>
        {map(this.state.list, item => (
          <div
            key={item.id}
            onDrop={e => this.handleCityDrop(e, item)}
            onDragOver={e => this.handleCityDragOver(e, item)}
            onDragStart={e => this.handleCityDragStart(e, item)}
            draggable
            style={{
              border: `1px solid ${item.id === get(this.state.targetItem, "id") ? "red" : "black"}`,
              padding: 20,
            }}
          >
            {item.city}
          </div>
        ))}
      </div>
    );
  }
}
