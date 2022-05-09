import { Controller, useFormContext } from "react-hook-form";
import { Widget as TWidget, Rule } from "./types";
import { parseRules, pickDependentFields } from "./utils";
import { Fragment, useContext } from "react";
import { FormRenderContext } from "./FormRenderContext";
import { every } from "lodash";

export const Field = ({ name, widget, type, defaultValue, rules, props = {}, visible = true, ...others }: TWidget) => {
  const { control, getValues, formState, watch } = useFormContext();
  const { validationFnList, widgetComponents } = useContext(FormRenderContext);
  const Widget = widgetComponents[widget];

  // const formValue = getValues();
  // const defaultVisible = checkAndParseOperator({
  //   data: visible,
  //   fnList: validationFnList,
  //   formValue,
  //   value: formValue[name],
  // });
  const watchFields = watch(pickDependentFields(visible));
  const shouldShow = every(watchFields);

  // console.log(defaultVisible, "defaultVisible");
  // console.log(res,'res');
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
      render={({ field }) => {
        if (!shouldShow) {
          return <Fragment />;
        }
        return (
          <Fragment>
            <Widget {...others} {...props} {...field} value={field.value} />
            {formState.errors[name]?.message && <div css={{ color: "red" }}>{formState.errors[name].message}</div>}
          </Fragment>
        );
      }}
    />
  );
};
