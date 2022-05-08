import { ButtonProps, Button, TextField, Select } from "@material-ui/core";
import { FC, forwardRef, Ref } from "react";
import { Widget as TWidget, FormValue, FieldValue, Operator, Rule } from "./types";
import { Validate } from "react-hook-form";

const MyButton: FC<ButtonProps & { text: string }> = forwardRef(({ text, ...others }, ref: Ref<HTMLButtonElement>) => {
  return (
    <Button {...others} ref={ref} variant={"contained"} color={"primary"}>
      {text}
    </Button>
  );
});

export const getWidgetComponentByType = (type: TWidget["widget"]) => {
  const mapping: {
    [key: string]: FC<any>;
  } = {
    text: TextField,
    select: Select,
    submit: MyButton,
  };

  return mapping[type];
};

interface ParseRuleParams {
  rules: Rule[];
  formValue: FormValue;
  fnList: ValidateFnList;
}

export const parseRules = ({ rules, fnList, formValue }: ParseRuleParams): Validate<FieldValue> => {
  return (value: FieldValue) => {
    if (!rules) {
      return [];
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

type ValidateFnCore = (value: FieldValue, formValue: FormValue) => boolean | FieldValue;
type ValidateFnList = { [key: string]: (...arg: any[]) => ValidateFnCore };

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

  return fnList[fnName](...args);
};

const isOperator = (data: any): data is Operator => Array.isArray(data);

const lte = (num: number) => (value: FieldValue, _formValue: FormValue) => value <= num;
const gte = (num: number) => (value: FieldValue, _formValue: FormValue) => value >= num;
const maxLength = (num: number) => (value: FieldValue, _formValue: FormValue) => value.length <= num;
const minLength = (num: number) => (value: FieldValue, _formValue: FormValue) => value.length >= num;

export const validationFnList = {
  lte,
  gte,
  maxLength,
  minLength,
};
