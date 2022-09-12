import { FC, useEffect, useState } from "react";
import { DataNode, TreeData } from "./type";
import { TreeNodes } from "./TreeNodes";
import { Checkbox } from "../checkbox/Checkbox";
import {
  KeyboardArrowDown,
  KeyboardArrowRight
} from "@material-ui/icons";

interface TreeProps {
  treeData: DataNode[];
}

export const Tree: FC<TreeProps> = ({ treeData }) => {
  const [treeNodes, setTreeNode] = useState<TreeNodes>();
  const [data, setData] = useState<TreeData[]>([]);

  useEffect(() => {
    const treeNodes = new TreeNodes(treeData);
    setTreeNode(treeNodes);
    setData(treeNodes.toTree());
  }, []);


  const renderRoots = (nodes: TreeData[]) => {
    return <div css={{ margin: 20 }}>
      {
        nodes.map((node) => {
          return (
            <div key={node.id}>
              <div css={{ display: "flex", alignItems: "center" }}>
                {node.collapsed !== null && (
                  <span onClick={() => {
                    treeNodes!.toggleCollapsedStatus(node.id);
                    setData(treeNodes!.toTree());
                  }} css={{cursor:"pointer"}}>{node.collapsed ?<KeyboardArrowRight fontSize={"large"} />:  <KeyboardArrowDown fontSize={"large"}/> }</span>
                )}
                <Checkbox value={node.checked} onChange={() => {
                  node.checked
                    ? treeNodes!.uncheckNode(node.id)
                    : treeNodes!.checkNode(node.id);
                  setData(treeNodes!.toTree());
                }}/>
                <span>{node.title}</span>
              </div>
              <div css={{ display: node.collapsed ? "none" : "block" }}>
                {node.children && renderRoots(node.children)}
              </div>
            </div>
          );
        })
      }
    </div>;
  };

  return treeNodes ? renderRoots(data) : null;
};
