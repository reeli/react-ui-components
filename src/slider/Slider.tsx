import React, { useRef, useState } from "react";

// 1. css() 方法会创建一个 className， append 到 style 里面，因此对于动态计算的样式，最好放到 inline style 属性上，避免频繁的创建 css class（每当属性发生变化都会创建新的 class？如果样式属性不变，那么 re-render 时应该不会重新创建新的 class?）
// 2. css point-event: none 表示鼠标事件“穿透”该元素并且指定该元素“下面”的任何东西

// TODO: 增大 click 进度条时候的点击区域(增加一个透明背景层)

export const Slider = ({ step = 5 }) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [deltaX, setDeltaX] = useState(0);
  const totalWidth = 100;
  const totalHeight = 4;
  // TODO: 解决浮点数相乘精读丢失问题，比如：0.14*100
  const percentage = Math.floor((deltaX / totalWidth).toFixed(2) * 100);
  const containerRef = useRef();

  const handleMove = (clientX: number) => {
    const dx = Math.ceil(Math.floor(clientX - startX) / step) * step;

    if (dx <= 0) {
      setDeltaX(0);
      return;
    }

    if (dx >= totalWidth) {
      setDeltaX(totalWidth);
      return;
    }

    setDeltaX(dx);

    // const per = Number((dx/totalWidth).toFixed(2))
    //
    // if(per<=0){
    //   setPercentage(0)
    //   return;
    // }
    // if(per>=1){
    //   setPercentage(100);
    //   return;
    // }
    //
    // setPercentage(per *100)
  };

  return (
    <div>
      <div
        css={{
          position: "relative",
          width: totalWidth,
          height: totalHeight,
          border: "1px solid #ccc",
        }}
        ref={containerRef}
      >
        <div
          css={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#ccc",
            zIndex: 10,
          }}
          onClick={(e) => {
            const containerRect = (containerRef.current as HTMLDivElement).getBoundingClientRect();
            const dx = Math.ceil((e.clientX - containerRect.left) / step) * step;

            if (dx <= 0) {
              setDeltaX(0);
              return;
            }

            if (dx >= totalWidth) {
              setDeltaX(totalWidth);
              return;
            }

            setDeltaX(dx);
          }}
        />

        <div
          css={{
            position: "absolute",
            width: `${percentage}%`,
            height: "100%",
            zIndex: 11,
            backgroundColor: "blue",
            pointerEvents: "none",
          }}
        />

        <div
          onTouchStart={(e) => {
            console.log("touch start", e.touches[0].clientX);
            setStartX(e.touches[0].clientX - deltaX);
          }}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            console.log("touch end");
          }}
          css={{
            width: totalHeight * 4,
            height: totalHeight * 4,
            borderRadius: totalHeight * 4,
            backgroundColor: "red",
            // backgroundColor: "rgba(255,0,0,0.5)",
            position: "absolute",
            zIndex: 13,
            left: `${percentage}%`,
            transform: `translate3d(-50%, -35%, 0)`,
          }}
        />
        <div>{percentage}</div>
      </div>
    </div>
  );
};
