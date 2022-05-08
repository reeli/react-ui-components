import { Controller, useFormContext, Validate } from "react-hook-form";
import { Widget as TWidget, FormValue, FieldValue } from "./types";
import { getWidgetComponentByType } from "./mapping";

export const Field = ({ name, widget, type, defaultValue, rules, props = {}, ...others }: TWidget) => {
  const { control, getValues } = useFormContext();
  const Widget = getWidgetComponentByType(widget);

  return (
    <Controller
      name={name}
      rules={rules && { validate: parseRules(rules, getValues(), name) }}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => <Widget {...others} {...props} {...field} />}
    />
  );
};

const parseRules = (rules: TWidget["rules"], formValue: FormValue, name: string): Validate<FieldValue> => {
  return (value: FieldValue) => {
    console.log(value, rules, formValue, name);
    return "";
  };
};
