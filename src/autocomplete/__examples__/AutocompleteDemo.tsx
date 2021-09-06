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
    value: "111",
  },
  {
    label: "rui1",
    value: "111",
  },
  {
    label: "rui2",
    value: "111",
  },
  {
    label: "tony",
    value: "222",
  },
  {
    label: "tony2",
    value: "222",
  },
];

export function AutocompleteDemo1() {
  return (
    <AutoComplete
      name={"name"}
      options={options}
      placeholder={"Please type some text..."}
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
}
