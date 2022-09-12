import { Checkbox } from "./Checkbox";
import { useInput } from "./useInput";

interface ISmartCheckboxProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

export function SmartCheckbox(props: ISmartCheckboxProps) {
  const { value, setValue } = useInput({
    inputValue: props.value,
  });

  return (
    <Checkbox
      value={value}
      onChange={val => {
        setValue(val);

        if (props.onValueChange) {
          props.onValueChange(val);
        }
      }}
    />
  );
}
