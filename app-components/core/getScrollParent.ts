function getParentNode(element: Element) {
  if (element.nodeName === "HTML") {
    return element;
  }
  return element.parentNode || (element as any).host;
}

function getStyleComputedProperty(element: Element, property?: string) {
  if (element.nodeType !== 1) {
    return [];
  }
  const window = element.ownerDocument!.defaultView!;
  const css = window.getComputedStyle(element, null);
  return property ? (css as any)[property] : css;
}

export function getScrollParent(element?: Element): Element {
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case "HTML":
    case "BODY":
      return element.ownerDocument!.body;
    case "#document":
      return (element as any).body as Element;
  }

  // Firefox want us to check `-x` and `-y` variations as well
  const { overflow, overflowX, overflowY } = getStyleComputedProperty(element);
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element) as any);
}

export const getScrollParents = (element: Element): Element[] => {
  const scrollParents: Element[] = [];

  let scrollParent = getScrollParent(element);

  while (scrollParent.nodeName !== "BODY") {
    scrollParents.push(scrollParent);
    scrollParent = getScrollParent(scrollParent.parentNode as Element);
  }

  scrollParents.push(scrollParent);

  return scrollParents;
};
