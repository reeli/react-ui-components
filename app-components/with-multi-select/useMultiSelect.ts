import { includes, isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { ISelectedValues } from './interfaces';
import { toSelectedValues, toSelectedValuesMap } from './utils';

export const isValueInSelectedValues = (value: string | number, selectedValues?: ISelectedValues) => {
  return includes(selectedValues, value);
};

interface IUseMultiSelectProps {
  selectedValues?: ISelectedValues;
  onSelectedValuesChange?: (selectedValues?: ISelectedValues) => void;
}

export const useMultiSelect = (props: IUseMultiSelectProps) => {
  const init = toSelectedValuesMap(props.selectedValues);
  const [selectedValuesMap, setSelectedValuesMap] = useState(init);
  const mountedRef = useRef(false);
  const [prevSelectedValues, setPrevSelectedValues] = useState<ISelectedValues>([]);
  const [prevMap, setPrevMap] = useState(init);

  useEffect(() => {
    if (mountedRef.current && props.onSelectedValuesChange) {
      if (!isEqual(prevMap, selectedValuesMap)) {
        props.onSelectedValuesChange(toSelectedValues(selectedValuesMap));
        setPrevMap(selectedValuesMap);
      }
    }

    if (props.selectedValues && !isEqual(props.selectedValues, prevSelectedValues)) {
      setPrevSelectedValues(props.selectedValues);
      setSelectedValuesMap(toSelectedValuesMap(props.selectedValues));
    }
  });

  mountedRef.current = true;

  return {
    selectedValues: toSelectedValues(selectedValuesMap),
    updateSelectedValues: (selectedValues: ISelectedValues) =>
      setSelectedValuesMap(toSelectedValuesMap(selectedValues)),
  };
};
