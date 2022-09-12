import { getScrollParent } from "src/core/utils/getScrollParent";

describe("getScrollParents", () => {
  it("should get document.body as scroll parent if element not exist", () => {
    expect(getScrollParent()).toEqual(document.body);
  });

  it("should find correct scroll parent for the element", () => {
    const mockParentNode = {
      nodeType: 1,
      parentNode: {},
      nodeName: "div",
      ownerDocument: {
        defaultView: {
          getComputedStyle: () => ({
            overflow: "scroll",
          }),
        },
      },
    };

    const mockElement = {
      nodeType: 1,
      parentNode: mockParentNode,
      nodeName: "span",
      ownerDocument: {
        defaultView: {
          getComputedStyle: () => {
            return {
              overflow: "hidden",
              "overflow-y": "hidden",
              "overflow-x": "hidden",
            };
          },
        },
      },
    };
    expect(getScrollParent(mockElement as any)).toEqual(mockParentNode);
  });

  it("when element node is Html or Body, should get it's ownerDocument.body as scroll parent", () => {
    const mockElement1 = {
      nodeType: 1,
      nodeName: "HTML",
      ownerDocument: {
        body: {},
      },
    };

    const mockElement2 = {
      nodeType: 1,
      nodeName: "BODY",
      ownerDocument: {
        body: {},
      },
    };
    expect(getScrollParent(mockElement1 as any)).toEqual({});
    expect(getScrollParent(mockElement2 as any)).toEqual({});
  });
});
