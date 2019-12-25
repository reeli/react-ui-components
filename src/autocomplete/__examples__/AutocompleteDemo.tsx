import React from "react";
import { AutocompleteWithTags } from "../AutocompleteWithTags";

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
      getOptionLabel={option => (option ? option.name : "")}
      options={suggestions}
      onInputChange={() => {}}
      placeholder={"Please type some text..."}
      isLoading={false}
      onChange={value => {
        console.log(value);
      }}
    />
  );
}
