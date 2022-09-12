import { useState } from "react";
import { get, map } from "lodash";

const listData = [
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

export function DragAndDrop() {
  const [draggedItem, setDraggedItem] = useState(null);
  const [targetItem, setTargetItem] = useState(null);
  const [list, setList] = useState(listData);

  const handleCityDrop = (_: any, item: any) => {
    const nextList = swap(list, item, draggedItem);
    // If drag too fast, sometimes this method cannot be called, so we should clear state in drag end method.
    setList(nextList);
  };

  const handleCityDragStart = (_: any, item: any) => {
    setDraggedItem(item);
  };

  const handleCityDragOver = (e: React.DragEvent, item: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setTargetItem(item);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setTargetItem(null);
  };

  return (
    <div>
      {map(list, (item) => (
        <div
          key={item.id}
          onDrop={(e) => handleCityDrop(e, item)}
          onDragOver={(e) => handleCityDragOver(e, item)}
          onDragStart={(e) => handleCityDragStart(e, item)}
          onDragEnd={() => handleDragEnd()}
          draggable
          style={{
            border: `1px solid ${item.id === get(targetItem, "id") ? "red" : "black"}`,
            padding: 20,
            margin: 20,
          }}
        >
          {item.city}
        </div>
      ))}
    </div>
  );
}
