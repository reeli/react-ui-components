import React, { useRef, useState, useEffect, MouseEvent } from "react";
import { useGesture } from "react-use-gesture";
import { SliderProps, constraintValue, calcPercentage, isExists } from ".";
import { usePrevious } from "@ui/base";

interface UseSliderParameters {
  sliderOffset: number;
  step: NonNullable<SliderProps["step"]>;
  min: NonNullable<SliderProps["min"]>;
  max: NonNullable<SliderProps["max"]>;
  onChange: NonNullable<SliderProps["onChange"]>;
  defaultValue?: SliderProps["defaultValue"];
  value?: SliderProps["value"];
}

export const useSlider = ({ min, max, step, defaultValue, onChange, sliderOffset, value }: UseSliderParameters) => {
  const sliderEl = useRef<HTMLDivElement>(null);
  const sliderTrackEl = useRef<HTMLDivElement>(null);
  const sliderFilledTrackEl = useRef<HTMLDivElement>(null);

  const [sliderValue, setSliderValue] = useState(defaultValue ? constraintValue(defaultValue, min, max) : 0);
  const sliderTrackRectRef = useRef<DOMRect>();
  const prevSliderValue = usePrevious(sliderValue);

  useEffect(() => {
    if (prevSliderValue && prevSliderValue !== sliderValue) {
      onChange && onChange(sliderValue);
    }
  }, [sliderValue]);

  useEffect(() => {
    if (isExists(value)) {
      const nextValue = constraintValue(value, min, max);
      setSliderValue(nextValue);
      setStyles(calcPercentage(nextValue, max, min));
    }
  }, [value]);

  useEffect(() => {
    sliderTrackRectRef.current = sliderTrackEl.current?.getBoundingClientRect();
    isExists(defaultValue) && setStyles(calcPercentage(defaultValue, max, min));
  }, []);

  const isSliderElementsExists = (event: React.PointerEvent | PointerEvent) =>
    (event.target as HTMLDivElement).getAttribute("role") === "slider" &&
    sliderEl.current &&
    sliderFilledTrackEl.current &&
    sliderTrackRectRef.current;

  const getOffsetValue = (mx: number, step: number) => {
    return Math.round(((mx / sliderTrackRectRef.current!.width) * (max - min)) / step) * step + min;
  };

  const getDraggingOffset = (mx: number) => {
    return (mx / sliderTrackRectRef.current!.width) * (max - min);
  };

  const setStyles = (percentage: number) => {
    sliderEl.current!.style.left = `calc(${percentage}% - ${sliderOffset}px)`;
    sliderFilledTrackEl.current!.style.width = `${percentage}%`;
  };

  const bind = useGesture({
    onDrag: ({ movement: [mx], event }) => {
      if (isSliderElementsExists(event)) {
        const nextValue = constraintValue(sliderValue + getDraggingOffset(mx), min, max);
        setStyles(calcPercentage(nextValue, max, min));
      }
    },
    onDragEnd: ({ movement: [mx], event }) => {
      if (isSliderElementsExists(event)) {
        const nextValue = constraintValue(sliderValue + getOffsetValue(mx, step), min, max);
        setSliderValue(nextValue);
        setStyles(calcPercentage(nextValue, max, min));
      }
    },
    onClick: ({ event }) => {
      const nextValue = constraintValue(
        getOffsetValue((event as unknown as MouseEvent).clientX - sliderTrackRectRef.current!.x, step),
        min,
        max,
      );
      setStyles(calcPercentage(nextValue, max, min));
      setSliderValue(nextValue);
    },
  });

  return {
    bind,
    sliderValue,
    sliderEl,
    sliderTrackEl,
    sliderFilledTrackEl,
  };
};
