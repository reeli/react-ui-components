import { DataNode } from "../type";
import { Tree } from "../Tree";


const treeData: DataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        // disabled: true,
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            // disableCheckbox: true
          },
          {
            title: "leaf",
            key: "0-0-0-1"
          }
        ]
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [{ title: <span style={{ color: "#1890ff" }}>sss</span>, key: "0-0-1-0" }]
      }
    ]
  },
  {
    title: "parent 2",
    key: "0-1",
    children: [
      {
        title: "parent 2-0",
        key: "0-1-0",
        children: [
          {
            title: "leaf",
            key: "0-1-0-0"
          },
        ]
      },
      {
        title: "parent 2-1",
        key: "0-1-1",
      }
    ]
  },
];

export function TreeDemo() {
  return (
    <div>
      <Tree treeData={treeData}/>
    </div>
  );
}

