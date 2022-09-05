import { FC, useEffect, useState } from "react";
import { DataNode, TreeData } from "src/tree/type";
import { TreeNodes } from "src/tree/TreeNodes";
import { Checkbox } from "src/checkbox/Checkbox";

interface TreeProps {
  treeData: DataNode[];
}

export const Tree: FC<TreeProps> = ({ treeData }) => {
  const [treeNodes, setTreeNode] = useState<TreeNodes>();
  const [data, setData] = useState<TreeData[]>([]);

  useEffect(() => {
    const treeNodes = new TreeNodes(treeData);
    setTreeNode(treeNodes)
    setData(treeNodes.toTree())
  }, []);


  const renderRoots = (nodes: TreeData[]) => {
    return <div css={{ margin: 20 }}>
      {
        nodes.map((node) => {
          return (
            <div key={node.id}>
              <div css={{ display: "flex", alignItems: "center" }}>
                <Checkbox value={node.checked} onChange={()=>{
                  treeNodes!.toggleCheckedStatus(node.id)
                  setData(treeNodes!.toTree())
                }}/>
                <span>{node.title}</span>
              </div>
              {node.children && renderRoots(node.children)}
            </div>
          );
        })
      }
    </div>;
  };

  return treeNodes ? renderRoots(data) :null;
};
