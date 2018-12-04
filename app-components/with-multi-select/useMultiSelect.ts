import { clone, isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { TSelectedState, TSelectedValue, TSelectedValues } from './interfaces';
import { toSelectedState, toSelectedValues } from './utils';

interface IUseMultiSelectProps {
  selectedValues?: TSelectedValues;
  onSelectedValuesChange?: (selectedValues?: TSelectedValues) => void;
}

const setValueByPrevState = (key: TSelectedValue) => {
  return (val: boolean) => {
    return (prevState: TSelectedState) => {
      const temp = clone(prevState);
      temp[key] = val;
      return temp;
    };
  };
};

export const usePrevious = (value: any) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export const useMultiSelect = ({ selectedValues, onSelectedValuesChange }: IUseMultiSelectProps) => {
  const [selectedState, setSelectedState] = useState(() => toSelectedState(selectedValues));
  const mountedRef = useRef(false);
  const [prevSelectedValues, setPrevSelectedValues] = useState<TSelectedValues>([]);
  const [prevSelectedState, prevSetSelectedState] = useState(selectedState);

  useEffect(() => {
    if (mountedRef.current && onSelectedValuesChange) {
      if (!isEqual(prevSelectedState, selectedState)) {
        onSelectedValuesChange(toSelectedValues(selectedState));
        prevSetSelectedState(selectedState);
      }
    }

    if (selectedValues && !isEqual(selectedValues, prevSelectedValues)) {
      setPrevSelectedValues(selectedValues);
      setSelectedState(toSelectedState(selectedValues));
    }
  });

  mountedRef.current = true;

  return {
    selectedValues: toSelectedValues(selectedState),
    selectedState,
    updateSelectedValues: (selectedValues: TSelectedValues) => setSelectedState(toSelectedState(selectedValues)),
    add: (value: TSelectedValue) => {
      setSelectedState(setValueByPrevState(value)(true));
    },
    remove: (value: TSelectedValue) => {
      setSelectedState(setValueByPrevState(value)(false));
    },
    toggle: (value: TSelectedValue) => {
      setSelectedState((prevState: TSelectedState) => setValueByPrevState(value)(!prevState[value])(prevState));
    },
  };
};
