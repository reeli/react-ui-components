import { css } from "@emotion/react";
import { useRef, useState, MouseEvent } from "react";
import { useGesture } from "react-use-gesture";
import { useSpring } from "react-spring";

// 1. css() 方法会创建一个 className， append 到 style 里面，因此对于动态计算的样式，最好放到 inline style 属性上，避免频繁的创建 css class（每当属性发生变化都会创建新的 class？如果样式属性不变，那么 re-render 时应该不会重新创建新的 class?）
// 2. css point-event: none 表示鼠标事件“穿透”该元素并且指定该元素“下面”的任何东西

// TODO: 增大 click 进度条时候的点击区域(增加一个透明背景层)

const basic = 12;

export const Slider = () => {
  const [{ x }, set] = useSpring(() => ({ x: 0 }));
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const offsetXRef = useRef(0);

  console.log(currentPercentage, "currentPercentage");
  const bind = useGesture({
    onDragStart: () => {
      offsetXRef.current = x.get();
    },
    onDragEnd: ({ movement: [mx] }) => {
      const sliderTrackRect = sliderTrackEl.current?.getBoundingClientRect();
      if (sliderTrackRect) {
        const deltaPx = sliderTrackRect.width / 100;
        const percentage = Math.round((offsetXRef.current + mx) / deltaPx);
        if (percentage < 0) {
          setCurrentPercentage(0);
          set({ x: 0 });
          return;
        }

        if (percentage > 100) {
          setCurrentPercentage(100);
          set({ x: 100 });
          return;
        }
        setCurrentPercentage(percentage);
        // set({y: percentage})
        set({ x: offsetXRef.current + mx });
      }
    },
    onDrag: ({ movement: [mx] }) => {
      const sliderTrackRect = sliderTrackEl.current?.getBoundingClientRect();
      if (sliderTrackRect) {
        const deltaPx = sliderTrackRect.width / 100;
        const percentage = Math.round((offsetXRef.current + mx) / deltaPx);
        if (percentage < 0) {
          setCurrentPercentage(0);
          set({ x: 0 });
          return;
        }

        if (percentage > 100) {
          setCurrentPercentage(100);
          set({ x: 100 });
          return;
        }
        setCurrentPercentage(percentage);
        // set({y: percentage})
        set({ x: offsetXRef.current + mx });
      }
    },
  });

  const handleSlickTrackClick = (evt: MouseEvent<HTMLDivElement>) => {
    if (sliderTrackEl.current) {
      const sliderTrackRect = sliderTrackEl.current.getBoundingClientRect();
      const deltaPx = sliderTrackRect.width / 100;
      const movementX = evt.clientX - sliderTrackRect.x;
      const percentage = Math.round(movementX / deltaPx);
      setCurrentPercentage(percentage);
      set({ x: movementX });
    }
  };

  const sliderTrackEl = useRef<HTMLDivElement>(null);

  return (
    <div css={containerStyles} >
      <div css={sliderTrackStyles} onClick={handleSlickTrackClick} ref={sliderTrackEl}>
        <div css={sliderFilledTrackStyles} style={{ width: `${currentPercentage}%` }}></div>
      </div>
      <div {...bind()} css={sliderStyles} style={{ left: `calc(${currentPercentage}% - ${basic}px)` }}></div>
      <input type={"hidden"} value={currentPercentage} />
    </div>
  );
};

const containerStyles = css({
  position: "relative",
  paddingTop: basic,
  paddingBottom: basic,
  outline: 0,
  // display: "inline-block",
  width: "100%",
  touchAction: "none",
  userSelect: "none",
  cursor: "pointer",
});

const sliderTrackStyles = css({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "100%",
  height: "0.5rem",
  overflow: "hidden",
  backgroundColor: "grey",
  borderRadius: "0.2rem",
});

const sliderFilledTrackStyles = css({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "red",
  height: "inherit",
  overflowX: "auto",
});

const sliderStyles = css({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: basic * 2,
  height: basic * 2,
  borderRadius: "50%",
  backgroundColor: "currentColor",
  outline: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  touchAction: "none",
  userSelect: "none",
  // left: "calc(0% - 7px)",
});
