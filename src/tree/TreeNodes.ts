import { DataNode, TreeData, TreeNode } from "src/tree/type";
import { isEmpty } from "lodash";


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

    this.treeNodes[id].collapsed = !this.treeNodes[id].collapsed;
  }

  private checkParent(id: string) {
    const parentId = this.treeNodes[id].parentId;

    if (parentId === null) {
      return;
    }

    const isAllChildNodesChecked = Object.values(this.treeNodes).filter(node => node.parentId === parentId).every(v => v.checked);

    if (isAllChildNodesChecked) {
      this.treeNodes[parentId].checked = true;
      this.checkParent(this.treeNodes[parentId].id);
    }
  }

  private uncheckParent(id: string) {
    const parentId = this.treeNodes[id].parentId;

    if (parentId === null) {
      return;
    }

    const isAnyChildNodesUnchecked = Object.values(this.treeNodes).filter(node => node.parentId === parentId).some(v => !v.checked);

    if (isAnyChildNodesUnchecked) {
      this.treeNodes[parentId].checked = false;
      this.uncheckParent(this.treeNodes[parentId].id);
    }
  }

  private checkChildren(id: string, value: boolean) {
    if(!this.treeNodes[id]){
      return;
    }

    Object.values(this.treeNodes).filter(node => node.parentId === id).forEach(node => {
      this.treeNodes[node.id].checked = value;
      this.checkChildren(node.id, value);
    });
  }

  findNodesByParentId(parentId: string | null) {
    if (parentId === null) {
      return Object.values(this.treeNodes).filter(node => node.parentId !== null);
    }

    return Object.values(this.treeNodes).filter(node => node.parentId === parentId);
  }


  toggleChildren(id: string, value: boolean) {
    this.findNodesByParentId(id).forEach(node => {
      if (node.collapsed !== null) {
        this.treeNodes[node.id].collapsed = value;
        this.toggleChildren(node.id, value);
      }
    });
  }

  public checkNode(id: string) {
    this.treeNodes[id].checked = true;
    this.checkParent(id);
    this.checkChildren(id, true);
  }

  public uncheckNode(id: string) {
    this.treeNodes[id].checked = false;
    this.uncheckParent(id);
    this.checkChildren(id, false);
  }

  toggleCheckedStatus(id: string) {
    this.treeNodes[id].checked ? this.uncheckNode(id) : this.checkNode(id);
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
