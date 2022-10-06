export interface SliderProps {
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
  onChange?: (value?: number) => void;
  sliderValue?: number;
}
