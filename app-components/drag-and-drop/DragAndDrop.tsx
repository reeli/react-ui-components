import React, { Component } from "react";
import { map } from "lodash";

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
    list,
  };

  handleDragStart = (e: React.DragEvent) => {
    console.log("drag start");
    console.log(e.target, "e.target");
    e.dataTransfer.setData("text/plain", e.target.id);
    // e.dataTransfer.dropEffect = "move";
  };

  handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    console.log(data, "data");
    e.target.appendChild(document.getElementById(data));
    console.log("drop");
  };

  handleDragOver = (e: React.DragEvent) => {
    // e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    console.log("drag over");
  };

  handleCityDrop = (e: React.DragEvent, item: any) => {
    const data = e.dataTransfer.getData("text/plain");
    console.log(data);

    const nextList = swap(this.state.list, item, this.state.draggedItem);
    this.setState({
      draggedItem: null,
      list: nextList,
    });
  };

  handleCityDragStart = (e: React.DragEvent, item: any) => {
    e.dataTransfer.setData("text/plain", item);
    e.dataTransfer.dropEffect = "move";
    console.log("start");

    this.setState({
      draggedItem: item,
    });
  };

  handleCityDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    console.log("over");
  };

  render() {
    return (
      <div>
        {map(this.state.list, item => (
          <div
            key={item.id}
            onDrop={e => this.handleCityDrop(e, item)}
            onDragOver={this.handleCityDragOver}
            onDragStart={e => this.handleCityDragStart(e, item)}
            draggable
            style={{ border: "1px solid pink", padding: 20 }}
          >
            {item.city}
          </div>
        ))}
        <p draggable onDragStart={this.handleDragStart} id={"p1"}>
          This element is draggable.
        </p>
        <div
          onDrop={this.handleDrop}
          onDragOver={this.handleDragOver}
          id={"target"}
          style={{ border: "1px solid red", padding: 50 }}
        >
          Drop Zone
        </div>
      </div>
    );
  }
}
