import React, { useRef, useState, useEffect, MouseEvent } from "react";
import { useGesture } from "react-use-gesture";
import { SliderProps, constraintValue, calcPercentage } from ".";

interface UseSliderParameters extends Required<SliderProps> {
  sliderOffset: number;
}

export const useSlider = ({ min, max, step, defaultValue, onChange, sliderOffset }: UseSliderParameters) => {
  const sliderEl = useRef<HTMLDivElement>(null);
  const sliderTrackEl = useRef<HTMLDivElement>(null);
  const sliderFilledTrackEl = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState(constraintValue(defaultValue, min, max));
  const sliderTrackRectRef = useRef<DOMRect>();

  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

  useEffect(() => {
    sliderTrackRectRef.current = sliderTrackEl.current?.getBoundingClientRect();
    setStyles(calcPercentage(defaultValue, max));
  }, []);

  const isSliderElementsExists = (event: React.PointerEvent | PointerEvent) => {
    return (
      (event.target as HTMLDivElement).getAttribute("role") === "slider" &&
      sliderEl.current &&
      sliderFilledTrackEl.current &&
      sliderTrackRectRef.current
    );
  };

  const getOffsetValue = (mx: number, step: number) => {
    return Math.round(((mx / sliderTrackRectRef.current!.width) * max) / step) * step;
  };

  const setStyles = (percentage: number) => {
    sliderEl.current!.style.left = `calc(${percentage}% - ${sliderOffset}px)`;
    sliderFilledTrackEl.current!.style.width = `${percentage}%`;
  };

  const bind = useGesture({
    onDrag: ({ movement: [mx], event }) => {
      if (isSliderElementsExists(event)) {
        const nextValue = constraintValue(value + getOffsetValue(mx, 1), min, max);
        setStyles(calcPercentage(nextValue, max));
      }
    },
    onDragEnd: ({ movement: [mx], event }) => {
      if (isSliderElementsExists(event)) {
        const nextValue = constraintValue(value + getOffsetValue(mx, step), min, max);
        setValue(nextValue);
        setStyles(calcPercentage(nextValue, max));
      }
    },
    onClick: ({ event }) => {
      const nextValue = constraintValue(
        getOffsetValue((event as unknown as MouseEvent).clientX - sliderTrackRectRef.current!.x, step),
        min,
        max,
      );
      setStyles(calcPercentage(nextValue, max));
      setValue(nextValue);
    },
  });

  return {
    bind,
    value,
    sliderEl,
    sliderTrackEl,
    sliderFilledTrackEl,
  };
};
