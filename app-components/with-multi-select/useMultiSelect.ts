import { clone, forEach, isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { ISelectOption, TSelectedState, TSelectedValue, TSelectedValues } from './interfaces';
import { toSelectedState, toSelectedValues } from './utils';

interface IUseMultiSelectProps {
  options: ISelectOption[];
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

export const useMultiSelect = ({ selectedValues, options, onSelectedValuesChange }: IUseMultiSelectProps) => {
  const [selectedState, setSelectedState] = useState(() => toSelectedState(selectedValues, options));
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
      setSelectedState(toSelectedState(selectedValues, options));
    }
  });

  mountedRef.current = true;

  return {
    selectedValues: toSelectedValues(selectedState),
    selectedState,
    updateSelectedValues: (selectedValues: TSelectedValues) =>
      setSelectedState(toSelectedState(selectedValues, options)),
    add: (value: TSelectedValue) => {
      setSelectedState(setValueByPrevState(value)(true));
    },
    remove: (value: TSelectedValue) => {
      setSelectedState(setValueByPrevState(value)(false));
    },
    toggle: (value: TSelectedValue) => {
      setSelectedState((prevState: TSelectedState) => setValueByPrevState(value)(!prevState[value])(prevState));
    },
    selectAll: () => {
      setSelectedState(() => {
        const nextState = {} as TSelectedState;
        forEach(options, option => (nextState[option.value] = true));
        return nextState;
      });
    },
    unselectAll: () => {
      setSelectedState(() => {
        const nextState = {} as TSelectedState;
        forEach(options, option => (nextState[option.value] = false));
        return nextState;
      });
    },
  };
};
