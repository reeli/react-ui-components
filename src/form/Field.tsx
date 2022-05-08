import { Controller, useFormContext } from "react-hook-form";
import { Widget as TWidget, Rule } from "./types";
import { getWidgetComponentByType, parseRules, validationFnList } from "./utils";
import { Fragment } from "react";

export const Field = ({ name, widget, type, defaultValue, rules, props = {}, ...others }: TWidget) => {
  const { control, getValues, formState } = useFormContext();
  const Widget = getWidgetComponentByType(widget);

  return (
    <Controller
      name={name}
      rules={{
        validate: parseRules({
          rules: rules as Rule[],
          formValue: getValues(),
          fnList: validationFnList,
        }),
      }}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Fragment>
          <div>
            <Widget {...others} {...props} {...field} value={field.value || ""} />
          </div>
          {formState.errors[name]?.message && <div>{formState.errors[name].message}</div>}
        </Fragment>
      )}
    />
  );
};
