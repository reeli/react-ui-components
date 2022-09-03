import { DataNode } from "src/tree/type";
import { TreeNodes } from "src/tree/TreeNodes";

describe("TreeNodes", () => {
  it("should convert tree data to tree nodes", () => {
    const treeNodes = new TreeNodes(treeData);
    expect(treeNodes.toTreeNodes(treeData)).toEqual({
      "0-0": {
        id: "0-0",
        title: "parent 1",
        parentId: null,
        checked: false,
        collapsed: false
      },
      "0-0-0": {
        id: "0-0-0",
        title: "parent 1-0",
        parentId: "0-0",
        checked: false,
        collapsed: false
        // disabled: true
      },
      "0-0-0-0": {
        id: "0-0-0-0",
        title: "leaf",
        parentId: "0-0-0",
        checked: false,
        collapsed: null
        // disableCheckbox: true
      },
      "0-0-0-1": {
        id: "0-0-0-1",
        parentId: "0-0-0",
        title: "leaf",
        checked: false,
        collapsed: null
      },
      "0-0-1": {
        id: "0-0-1",
        title: "parent 1-1",
        parentId: "0-0",
        checked: false,
        collapsed: false
      },
      "0-0-1-0": {
        id: "0-0-1-0",
        parentId: "0-0-1",
        title: <span style={{ color: "#1890ff" }}>sss</span>,
        checked: false,
        collapsed: null
      }
    });
  });

  describe("check and uncheck a node", () => {
    it("should check a basic node", () => {
      const treeNodes = new TreeNodes(treeData);
      const id = "0-0-0-0";
      treeNodes.toggleCheckedStatus(id);
      expect(treeNodes.treeNodes[id].checked).toEqual(true);
    });

    it("should uncheck a basic node", () => {
      const treeNodes = new TreeNodes(treeData);
      const id = "0-0-0-0";

      treeNodes.toggleCheckedStatus(id);
      treeNodes.toggleCheckedStatus(id);

      expect(treeNodes.treeNodes[id].checked).toEqual(false);
    });

    it("should check the parent node if all children node are checked", () => {
      const treeNodes = new TreeNodes(treeData);

      const id = "0-0-1-0";
      const parentId = "0-0-1";
      treeNodes.toggleCheckedStatus(id);

      expect(treeNodes.treeNodes[id].checked).toEqual(true);
      expect(treeNodes.treeNodes[parentId].checked).toEqual(true);
    });

    it("should check all the child nodes if checked a parent node", () => {
      const treeNodes = new TreeNodes(treeData);

      const id = "0-0-0";
      const childId = "0-0-0-1";
      treeNodes.toggleCheckedStatus(id);

      expect(treeNodes.treeNodes[id].checked).toEqual(true);
      expect(treeNodes.treeNodes[childId].checked).toEqual(true);
    });

    it("should uncheck all child nodes if checked a parent node", () => {
      const treeNodes = new TreeNodes(treeData);

      const id = "0-0-0";
      const childNode1 = "0-0-0-0";
      const childNode2 = "0-0-0-1";

      treeNodes.toggleCheckedStatus(id);
      treeNodes.toggleCheckedStatus(id);

      expect(treeNodes.treeNodes[id].checked).toEqual(false);
      expect(treeNodes.treeNodes[childNode1].checked).toEqual(false);
      expect(treeNodes.treeNodes[childNode2].checked).toEqual(false);
    });

    it("should check all nodes if checked root node", () => {
      const treeNodes = new TreeNodes(treeData);

      treeNodes.toggleCheckedStatus("0-0");

      expect(treeNodes.treeNodes["0-0"].checked).toEqual(true);
      expect(treeNodes.treeNodes["0-0-0"].checked).toEqual(true);
      expect(treeNodes.treeNodes["0-0-0-0"].checked).toEqual(true);
      expect(treeNodes.treeNodes["0-0-0-1"].checked).toEqual(true);
      expect(treeNodes.treeNodes["0-0-1"].checked).toEqual(true);
      expect(treeNodes.treeNodes["0-0-1-0"].checked).toEqual(true);
    });

    it("should uncheck all nodes if checked root node", () => {
      const treeNodes = new TreeNodes(treeData);

      treeNodes.toggleCheckedStatus("0-0");
      treeNodes.toggleCheckedStatus("0-0");

      expect(treeNodes.treeNodes["0-0"].checked).toEqual(false);
      expect(treeNodes.treeNodes["0-0-0"].checked).toEqual(false);
      expect(treeNodes.treeNodes["0-0-0-0"].checked).toEqual(false);
      expect(treeNodes.treeNodes["0-0-0-1"].checked).toEqual(false);
      expect(treeNodes.treeNodes["0-0-1"].checked).toEqual(false);
      expect(treeNodes.treeNodes["0-0-1-0"].checked).toEqual(false);
    });
  });
});


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
            key: "0-0-0-0"
            // disableCheckbox: true
          },
          {
            title: "leaf",
            key: "0-0-0-1"
            // disableCheckbox: true
          }
        ]
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [{ title: <span style={{ color: "#1890ff" }}>sss</span>, key: "0-0-1-0" }]
      }
    ]
  }
];
