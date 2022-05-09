import { Controller, useFormContext } from "react-hook-form";
import { Widget as TWidget, Rule } from "./types";
import { parseRules } from "./utils";
import { Fragment, useContext } from "react";
import { FormRenderContext } from "./FormRenderContext";

export const Field = ({ name, widget, type, defaultValue, rules, props = {}, ...others }: TWidget) => {
  const { control, getValues, formState } = useFormContext();
  const { validationFnList, widgetComponents } = useContext(FormRenderContext);
  const Widget = widgetComponents[widget];

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
            <Widget {...others} {...props} {...field} value={field.value} />
          </div>
          {formState.errors[name]?.message && <div css={{ color: "red" }}>{formState.errors[name].message}</div>}
        </Fragment>
      )}
    />
  );
};
