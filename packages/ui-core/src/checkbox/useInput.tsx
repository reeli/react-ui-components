import { useEffect, useState } from "react";
import { usePrevious } from "@ui/base";

interface IUseCheckboxProps {
  inputValue?: any;
}

export function useInput({ inputValue }: IUseCheckboxProps) {
  const [value, setValue] = useState(inputValue);
  const prevValue = usePrevious(inputValue);

  useEffect(() => {
    if (prevValue !== inputValue) {
      setValue(inputValue);
    }
  });

  return {
    value,
    setValue: (value: boolean) => setValue(value),
  };
}
