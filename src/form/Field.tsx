import { Input, Select } from "@material-ui/core";
import { Controller, useFormContext, Validate } from "react-hook-form";
import { Widget as TWidget, FormValue, FieldValue } from "./types";
import { FunctionComponent } from "react";

export const Field = ({ name, widget, rules }: TWidget) => {
  const { control, getValues } = useFormContext();
  const Widget = getWidgetComponentByType(widget);

  return (
    <Controller
      name={name}
      rules={rules && { validate: parseRules(rules, getValues(), name) }}
      control={control}
      render={({ field }) => {
        return <Widget {...field} />;
      }}
    />
  );
};

const getWidgetComponentByType = (type: TWidget["widget"]) => {
  const mapping: { [key: string]: FunctionComponent<{ name: string; onChange: (value: unknown) => void }> } = {
    text: Input,
    select: Select,
  };

  return mapping[type];
};

const parseRules = (rules: TWidget["rules"], formValue: FormValue, name: string): Validate<FieldValue> => {
  return (value: FieldValue) => {
    console.log(value, rules, formValue, name);
    return "";
  };
};
