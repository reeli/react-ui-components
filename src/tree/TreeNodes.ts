import { DataNode, TreeNode } from "src/tree/type";
import { mapValues } from "lodash";


export class TreeNodes {
  treeNodes: { [key: string]: TreeNode };

  constructor(treeData: DataNode[]) {
    this.treeNodes = this.toTreeNodes(treeData);
  }

  toTreeNodes(treeData: DataNode[], parentId: string | null = null): typeof this.treeNodes {
    return treeData.reduce((res, item) => {
      return {
        ...res,
        [item.key]: {
          id: item.key,
          parentId,
          title: item.title,
          // visible: false,
          checked: false,
          collapsed: item.children ? false : null
          // disabled: item.disabled,
          // disableCheckbox: item.disableCheckbox,
        },
        ...(item.children ? this.toTreeNodes(item.children, item.key) : {})
      };
    }, {});
  }

  toggleCheckedStatus(id: string) {
    const parentId = this.treeNodes[id].parentId;
    const value = !this.treeNodes[id].checked;

    if (!parentId) {
      this.treeNodes = mapValues(this.treeNodes, (node) => {
        return {
          ...node,
          checked: value
        };
      });

      return;
    }

    this.treeNodes[id].checked = value;

    this.treeNodes = mapValues(this.treeNodes, (node) => {
      if (node.parentId === id) {
        return {
          ...node,
          checked: value
        };
      }
      return node;
    });


    const isAllChildNodesChecked = this.findNodesByParentId(parentId).every(node => node.checked);

    if (isAllChildNodesChecked) {
      this.treeNodes[parentId].checked = true;
    }
  }

  findNodesByParentId(parentId: string) {
    // if (parentId === null) {
    //   return Object.values(this.treeNodes).filter(node => node.parentId !== null);
    // }

    return Object.values(this.treeNodes).filter(node => node.parentId === parentId);
  }
}
