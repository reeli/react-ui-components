import {
  ButtonProps,
  Button,
  TextField,
  Select,
  Switch,
  SwitchProps,
  TextFieldProps,
  FormControlLabel,
} from "@material-ui/core";
import { FC, forwardRef } from "react";
import { FormValue, FieldValue, Operator, Rule, ValidateFnList, ValidateFnCore } from "./types";
import { Validate } from "react-hook-form";
import { get, isEqual } from "lodash";

const MyButton: FC<ButtonProps & { text: string }> = forwardRef(({ text, ...others }, ref) => {
  return (
    <Button {...others} ref={ref} variant={"contained"} color={"primary"}>
      {text}
    </Button>
  );
});

const MySwitch: FC<SwitchProps & { value: boolean; label: string; onChange: (value: FieldValue) => void }> = forwardRef(
  ({ value, label, onChange, ...others }, ref) => {
    return (
      <FormControlLabel
        control={
          <Switch {...others} checked={value} ref={ref} onChange={(_, checked) => onChange && onChange(checked)} />
        }
        label={label}
        labelPlacement={"top"}
      />
    );
  },
);

const MyTextField: FC<TextFieldProps & { value: string }> = forwardRef(({ value = "", label, ...others }, ref) => {
  return (
    <FormControlLabel
      control={<TextField value={value} {...others} ref={ref} />}
      label={label}
      labelPlacement={"top"}
    />
  );
});

export const widgetComponents = {
  text: MyTextField,
  select: Select,
  switch: MySwitch,
  submit: MyButton,
};

interface ParseRuleParams {
  rules: Rule[];
  formValue: FormValue;
  fnList: ValidateFnList;
}

export const parseRules = ({ rules, fnList, formValue }: ParseRuleParams): Validate<FieldValue> => {
  return (value: FieldValue) => {
    if (!rules) {
      return undefined;
    }

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];

      if ((rule.when && parseOperator(rule.when, fnList)(value, formValue)) || !rule.when) {
        if (!parseOperator(rule.rule, fnList)(value, formValue)) {
          return rule.errorMsg;
        }
      }
    }

    return undefined;
  };
};

export const parseOperator = (operator: Operator, fnList: ValidateFnList): ValidateFnCore => {
  const [fnName, ...others] = operator;
  const args: any[] = [];

  others.forEach((item) => {
    if (isOperator(item)) {
      args.push(parseOperator(item, fnList));
    } else {
      args.push(item);
    }
  });

  return fnList[fnName] && fnList[fnName](...args);
};

const isOperator = (data: any): data is Operator => Array.isArray(data);

export const pickDependentFields = (data: any): string[] => {
  if (isOperator(data)) {
    let collections: string[] = [];
    const [name, ...others] = data;

    if (name === "get") {
      collections = collections.concat(others[0] as string);
    }

    others.forEach((item) => {
      if (Array.isArray(item)) {
        collections = collections.concat(pickDependentFields(item));
      }
    });

    return collections;
  }

  return [];
};

interface ParseOperatorParams {
  data: any;
  value: FieldValue;
  formValue: FormValue;
  fnList: ValidateFnList;
}

export const checkAndParseOperator = ({ data, formValue, value, fnList }: ParseOperatorParams) => {
  if (isOperator(data)) {
    return parseOperator(data, fnList)(value, formValue);
  }

  return data;
};

const required = () => (value: FieldValue, _formValue: FormValue) =>
  value !== undefined && value !== null && value !== "";
const lte = (num: number) => (value: FieldValue, _formValue: FormValue) => value <= num;
const gte = (num: number) => (value: FieldValue, _formValue: FormValue) => value >= num;
const maxLength = (num: number) => (value: FieldValue, _formValue: FormValue) => value.length <= num;
const minLength = (num: number) => (value: FieldValue, _formValue: FormValue) => value.length >= num;
const getValue = (name: string) => (_value: FieldValue, formValue: FormValue) => get(formValue, name);
const eq = (a: any, b: any) => (_value: FieldValue, _formValue: FormValue) => isEqual(a, b);

export const validationFnList = {
  lte,
  gte,
  maxLength,
  minLength,
  required,
  get: getValue,
  eq,
};
