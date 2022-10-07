import { useContext, useEffect, useRef, FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { PortalContext, PortalProvider } from "./PortalContext";

export const Portal: FC<PropsWithChildren> = (props) => {
  // 这里要用 "ref" 的 current 属性来保存 container 节点，否则每次 re-render 都会重新创建 container 节点。
  // "ref" 的 current 类似于 class 组件上的 instance 属性。
  const { container } = useContext(PortalContext);
  let containerRef = useRef<HTMLDivElement | null>(null);

  // 如果 container 节点不存在，创建一个 div 元素，保存到 "ref" 的 current 属性中，并且添加到 document.body。
  if (!containerRef.current) {
    containerRef.current = document.createElement("div");
    containerRef.current.setAttribute("role", "portal");

    container.appendChild(containerRef.current);
  }

  // 当组件销毁时，移除 container 节点。
  useEffect(() => {
    return function cleanup() {
      if (containerRef.current) {
        container.removeChild(containerRef.current);
      }
    };
  }, []);

  return (
    <PortalProvider
      value={{
        container: containerRef.current,
      }}
    >
      {createPortal(props.children, containerRef.current)}
    </PortalProvider>
  );
};
