import  { useState } from "react";
import { Checkbox } from "../Checkbox";
import { SmartCheckbox } from "../SmartCheckbox";

export function CheckboxDemo() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <div>
      <h2>Dumb Checkbox</h2>
      <Checkbox />
      <Checkbox
        value={checked1}
        onChange={() => {
          setChecked1(!checked1);
        }}
      />
      <h2>Smart Checkbox</h2>
      <SmartCheckbox />
      <SmartCheckbox
        value={checked2}
        onValueChange={() => {
          setChecked2(!checked2);
        }}
      />
    </div>
  );
}
