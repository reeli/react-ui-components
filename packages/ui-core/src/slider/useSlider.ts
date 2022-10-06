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
  sliderValue?: SliderProps["sliderValue"];
}

export const useSlider = ({
  min,
  max,
  step,
  defaultValue,
  onChange,
  sliderOffset,
  sliderValue,
}: UseSliderParameters) => {
  const sliderEl = useRef<HTMLDivElement>(null);
  const sliderTrackEl = useRef<HTMLDivElement>(null);
  const sliderFilledTrackEl = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState(defaultValue ? constraintValue(defaultValue, min, max) : 0);
  const sliderTrackRectRef = useRef<DOMRect>();
  const prevValue = usePrevious(value);

  useEffect(() => {
    if (prevValue && prevValue !== value) {
      onChange && onChange(value);
    }
  }, [value]);

  useEffect(() => {
    if (isExists(sliderValue)) {
      const nextValue = constraintValue(sliderValue, min, max);
      setValue(nextValue);
      setStyles(calcPercentage(nextValue, max));
    }
  }, [sliderValue, max]);

  useEffect(() => {
    sliderTrackRectRef.current = sliderTrackEl.current?.getBoundingClientRect();
    isExists(defaultValue) && setStyles(calcPercentage(defaultValue, max));
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
