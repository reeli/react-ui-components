import React from "react";
import { AutocompleteWithTags } from "../AutocompleteWithTags";
import { AutoComplete } from "src/autocomplete/AutoComplete";

const suggestions = [
  {
    name: "rui",
    id: "111",
  },
  {
    name: "tony",
    id: "222",
  },
];

export function AutocompleteDemo() {
  return (
    <AutocompleteWithTags
      name={"name"}
      getOptionLabel={(option) => (option ? option.name : "")}
      options={suggestions}
      onInputChange={() => {}}
      placeholder={"Please type some text..."}
      isLoading={false}
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
}

const options = [
  {
    label: "rui",
    value: "rui",
  },
  {
    label: "rui1",
    value: "rui1",
  },
  {
    label: "rui2",
    value: "rui2",
  },
  {
    label: "tony",
    value: "tony",
  },
  {
    label: "tony2",
    value: "tony2",
  },
  {
    label: "tony3",
    value: "tony3",
  },
  {
    label: "tony4",
    value: "tony4",
  },
];

export function AutocompleteDemo1() {
  return (
    <AutoComplete
      name={"name"}
      options={options}
      placeholder={"Please type some text..."}
      onChange={(value) => {
        console.log(value, "value in onchange");
      }}
    />
  );
}
