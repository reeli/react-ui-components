import { Select, TextField, Button, ButtonProps } from "@material-ui/core";
import { Controller, useFormContext, Validate } from "react-hook-form";
import { Widget as TWidget, FormValue, FieldValue } from "./types";
import { FunctionComponent, forwardRef, Ref, FC } from "react";

const MyButton: FC<ButtonProps & { text: string }> = forwardRef(({ text, ...others }, ref: Ref<HTMLButtonElement>) => {
  return (
    <Button {...others} ref={ref}>
      {text}
    </Button>
  );
});

export const Field = ({ name, widget, type, defaultValue, rules, props = {}, ...others }: TWidget) => {
  const { control, getValues } = useFormContext();
  const Widget = getWidgetComponentByType(widget);

  if (type === "submit") {
    return (
      <Widget name={name} type={"submit"} variant={"contained"} color={"primary"} {...others}>
        {"submit"}
      </Widget>
    );
  }

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

const getWidgetComponentByType = (type: TWidget["widget"]) => {
  const mapping: {
    [key: string]: FunctionComponent<any>;
  } = {
    text: TextField,
    select: Select,
    button: MyButton,
  };

  return mapping[type];
};

const parseRules = (rules: TWidget["rules"], formValue: FormValue, name: string): Validate<FieldValue> => {
  return (value: FieldValue) => {
    console.log(value, rules, formValue, name);
    return "";
  };
};
