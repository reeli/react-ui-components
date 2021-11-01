import { RefObject, useState } from "react";

interface IUseInputKeyDownInputs {
  scrollContainer: RefObject<HTMLElement | null>;
  offsetY: number;
  maxIdx: number;
  defaultActiveIdx?: number;
  onEnter?: (e: KeyboardEvent, activeIdx: number) => void;
  onBackSpace?: (e: KeyboardEvent, activeIdx: number) => void;
}

export const useInputKeyDown = ({
  defaultActiveIdx = -1,
  maxIdx,
  offsetY,
  onEnter,
  onBackSpace,
  scrollContainer,
}: IUseInputKeyDownInputs) => {
  const [activeIdx, setActiveIdx] = useState(defaultActiveIdx);

  const scrollToPrev = () => {
    if (!scrollContainer.current) {
      return;
    }

    if (offsetY > 0) {
      scrollContainer.current.scrollTop = scrollContainer.current.scrollTop - offsetY;
    }
  };

  const scrollToNext = (idx: number) => {
    if (!scrollContainer.current) {
      return;
    }

    const containerHeight = scrollContainer.current.getBoundingClientRect().height;
    const min = Math.floor(containerHeight / offsetY);

    if (idx >= min) {
      scrollContainer.current.scrollTop = scrollContainer.current.scrollTop + offsetY;
    }
  };

  const resetActiveIdx = (idx = defaultActiveIdx) => {
    setActiveIdx(idx);
  };

  const handleInputKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        setActiveIdx((prev) => {
          const next = prev - 1;
          const nextActiveIdx = next >= 0 ? next : prev;

          scrollToPrev();

          return nextActiveIdx;
        });
        break;
      case "ArrowDown":
        setActiveIdx((prev) => {
          const next = prev + 1;
          const nextActiveIdx = next < maxIdx ? next : prev;

          scrollToNext(nextActiveIdx);

          return nextActiveIdx;
        });
        break;
      case "Enter":
        e.preventDefault();
        onEnter && onEnter(e, activeIdx);
        break;
      case "Backspace":
        onBackSpace && onBackSpace(e, activeIdx);
        break;
    }
  };

  return [handleInputKeyDown, activeIdx, resetActiveIdx] as const;
};
