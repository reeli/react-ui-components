import { useRef, useState, useEffect, MouseEvent } from "react";
import { useGesture } from "react-use-gesture";
import { SliderProps, constraintPercentage, getDefaultPercentage } from ".";

interface UseSliderParameters extends Required<SliderProps> {
  sliderOffset: number;
}

export const useSlider = ({ min, max, step, defaultValue, onChange, sliderOffset }: UseSliderParameters) => {
  const sliderTrackEl = useRef<HTMLDivElement>(null);
  const sliderEl = useRef<HTMLDivElement>(null);
  const sliderFilledTrackEl = useRef<HTMLDivElement>(null);

  const [percentage, setPercentage] = useState(
    constraintPercentage(getDefaultPercentage({ min, max, step, defaultValue })),
  );

  useEffect(() => {
    onChange && onChange(percentage);
  }, [percentage]);

  const bind = useGesture({
    onDragEnd: ({ movement: [mx], event }) => {
      if ((event.target as HTMLDivElement).getAttribute("role") !== "slider") {
        return;
      }

      const sliderTrackRect = sliderTrackEl.current?.getBoundingClientRect();

      if (!sliderTrackRect) {
        return;
      }

      const deltaX = sliderTrackRect.width / 100;

      setPercentage((percentage) => {
        const currentX = mx + percentage * deltaX;
        return constraintPercentage(Math.round(currentX / deltaX));
      });
    },
    onDrag: ({ movement: [mx], event }) => {
      if ((event.target as HTMLDivElement).getAttribute("role") !== "slider") {
        return;
      }

      const sliderTrackRect = sliderTrackEl.current?.getBoundingClientRect();
      if (!sliderEl.current || !sliderFilledTrackEl.current || !sliderTrackRect) {
        return;
      }

      const deltaX = sliderTrackRect.width / 100;
      const currentX = percentage * deltaX + mx;

      let nextPercentage = Math.round(currentX / deltaX);
      if (nextPercentage > 100) {
        nextPercentage = 100;
      }

      if (nextPercentage < 0) {
        nextPercentage = 0;
      }

      sliderEl.current.style.left = `calc(${nextPercentage}% - ${sliderOffset}px)`;
      sliderFilledTrackEl.current!.style.width = `${nextPercentage}%`;
    },
  });

  const handleSlickTrackClick = (evt: MouseEvent<HTMLDivElement>) => {
    const sliderTrackRect = sliderTrackEl.current?.getBoundingClientRect();
    if (!sliderTrackRect) {
      return;
    }

    const deltaX = sliderTrackRect.width / 100;
    const nextX = constraintPercentage(Math.round((evt.clientX - sliderTrackRect.x) / deltaX));

    if (step && max) {
      const num = Math.round(((nextX / 100) * max) / step);
      setPercentage(() => ((num * step) / max) * 100);
      return;
    }

    setPercentage(() => {
      return constraintPercentage(nextX);
    });
  };

  return {
    bind,
    handleSlickTrackClick,
    sliderEl,
    sliderTrackEl,
    sliderFilledTrackEl,
    percentage
  };
};
