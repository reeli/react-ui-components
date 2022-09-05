import { DataNode, TreeData, TreeNode } from "src/tree/type";
import { mapValues, isEmpty } from "lodash";


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
          checked: false,
          collapsed: item.children ? false : null
        },
        ...(item.children ? this.toTreeNodes(item.children, item.key) : {})
      };
    }, {});
  }

  toggleCollapsedStatus(id: string) {
    const collapsed = this.treeNodes[id].collapsed;

    if (collapsed === null) {
      return;
    }

    this.treeNodes[id].collapsed = !collapsed;
    this.toggleChildren(id, !collapsed);
  }

  toggleChildren(id: string, value: boolean) {
    this.findNodesByParentId(id).forEach(node => {
      if (node.collapsed !== null) {
        this.treeNodes[node.id].collapsed = value;
        this.toggleChildren(node.id, value);
      }
    });
  }

  toggleCheckedStatus(id: string) {
    const parentId = this.treeNodes[id].parentId;
    const value = !this.treeNodes[id].checked;

    this.treeNodes[id].checked = value;

    if (!parentId) {
      this.findNodesByParentId(id).forEach(node => {
        this.treeNodes[node.id].checked = value;
      });

      return;
    }


    this.treeNodes = mapValues(this.treeNodes, (node) => {
      if (node.parentId === id) {
        return {
          ...node,
          checked: value
        };
      }
      return node;
    });


    const nodes = this.findNodesByParentId(parentId);
    const isAllChildNodesChecked = nodes.every(node => node.checked);
    const isAllChildNodesUnChecked = nodes.every(node => !node.checked);

    // if (isAllChildNodesChecked) {
    //   this.treeNodes[parentId].checked = value;
    // }

    if (isAllChildNodesUnChecked || isAllChildNodesChecked) {
      this.treeNodes[parentId].checked = value;
    }
  }

  findNodesByParentId(parentId: string | null, final: TreeNode[] = []): TreeNode[] {
    // if (parentId === null) {
    //   return Object.values(this.treeNodes).filter(node => node.parentId !== null);
    // }

    const res = Object.values(this.treeNodes).filter(node => node.parentId === parentId);
    final = [...res];

    res.forEach(v => {
      final = [
        ...final,
        ...this.findNodesByParentId(v.id, final)
      ];
    });

    return final;
  }

  toTree() {
    const roots = Object.values(this.treeNodes).filter(node => node.parentId === null);
    if (roots.length === 0) {
      return [];
    }

    const findChildrenById = (id: string): TreeData[] => {
      const matchList = Object.values(this.treeNodes).filter((node) => {
        return node.parentId === id;
      });

      return matchList.map(node => {
        const children = findChildrenById(node.id);
        return children
          ? {
            ...node,
            children: isEmpty(children) ? undefined : children
          }
          : node;
      });
    };


    return roots.map(root => ({
      id: root.id,
      collapsed: root.collapsed,
      checked: root.checked,
      title: root.title,
      parentId: root.parentId || null,
      children: findChildrenById(root.id)
    }));
  }
}