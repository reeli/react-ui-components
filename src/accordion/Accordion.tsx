import { useState, FC, Children } from "react";

export const Accordion: FC = ({ children }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const handleClick = (currentIdx: number) => {
    setCurrentIdx(currentIdx);
  };

  return (
    <div>
      {Children.map(children, (item: any, index) => {
        const expanded = currentIdx === index;
        return (
          <div>
            <div
              onClick={() => {
                handleClick(index);
              }}
              css={{ cursor: "pointer" }}
            >
              {item?.props?.header}
            </div>
            <div
              css={{
                display: expanded ? "block" : "none",
                height: expanded ? "auto" : 0,
                transition: "height .2s",
              }}
            >
              {item?.props?.children}
            </div>
          </div>
        );
      })}
    </div>
  );
};
