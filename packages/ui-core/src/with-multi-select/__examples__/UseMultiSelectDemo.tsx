import { map } from "lodash";
import { Checkbox } from "../../checkbox/Checkbox";
import { useMultiSelect } from "../useMultiSelect";

const options = [
  {
    value: "cat",
    display: "Cat",
  },
  {
    value: "dog",
    display: "Dog",
  },
  {
    value: "bird",
    display: "bird",
  },
];

const initialValues = ["cat", "dog"];

export const UseMultiSelectDemo = () => {
  const { selectedState, toggle, selectAll, unselectAll } = useMultiSelect({
    options,
    selectedValues: initialValues,
    onSelectedValuesChange: (values) => {
      console.log(values, "onchange");
    },
  });

  return (
    <div>
      {map(options, (option) => {
        return (
          <Checkbox
            key={option.value}
            value={selectedState[option.value]}
            onChange={() => {
              toggle(option.value);
            }}
            label={option.display}
          />
        );
      })}
      <div onClick={selectAll}>select all</div>
      <Checkbox onChange={selectAll} label={"select all"} />
      <div onClick={unselectAll}>unselect all</div>
    </div>
  );
};
