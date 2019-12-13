import { useState } from "react";
import { dropRight, filter, isEmpty, isEqual } from "lodash";

export const useMultiSelect = <T extends any>(defaultValue?: T) => {
  const [selectedValues, setSelectedValues] = useState<T[]>(defaultValue || []);

  const addValue = (val: T) => setSelectedValues([...selectedValues, val]);
  const removeValue = (val: T) => setSelectedValues(filter(selectedValues, selectedVal => !isEqual(selectedVal, val)));

  const removeLastSelectedValue = () => {
    if (!isEmpty(selectedValues)) {
      setSelectedValues(dropRight(selectedValues));
    }
  };

  return [selectedValues, addValue, removeValue, removeLastSelectedValue] as const;
};
