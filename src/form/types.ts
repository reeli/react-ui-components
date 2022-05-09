export interface FormSpec {
  formId: string;
  widgets: Widget[];
  title?: string;
  description?: string;
  actions: {
    client: {
      onSubmit: {
        apiUrl: string;
      };
      onSubmitSuccess: RedirectAction | AlertAction;
      onSubmitFail: RedirectAction | AlertAction;
    };
  };
  submit: {
    confirmText: string;
  };
}

export type Widget =
  | StringInput
  | NumberInput
  | DateInput
  | SelectInput
  | BooleanInput
  | FieldArrayInput
  | FieldSection;

interface Action {
  type: string;
}

export interface RedirectAction extends Action {
  type: "redirect";
  url: string;
}

export interface AlertAction extends Action {
  type: "alert";
  message?: string;
}

interface BasicInput {
  name: string;
  widget: string;
  label?: string;
  description?: string;
  defaultValue?: any;
  props?: any; // extra props will pass to component
}

export interface StringInput extends BasicInput {
  type: "string";
  widget: "text" | "textarea";
  placeholder?: string;
  rules?: Rule[];
  maxLength?: number;
  minLength?: number;
  allowClear?: boolean;
  addonBefore?: string;
  addonAfter?: string;
}

interface NumberInput extends BasicInput {
  type: "number";
  widget: "number" | "currency";
  placeholder?: string;
  rules?: Rule[];
  max?: number;
  min?: number;
}

interface BooleanInput extends BasicInput {
  type: "boolean";
  widget: "switch" | "toggle";
  rules?: null;
}

interface DateInput extends BasicInput {
  type: "date";
  widget: "datepicker" | "rangePicker";
  defaultValue: string | string[];
  placeholder?: string | string[];
  rules?: Rule[] | Rule[][];
  max?: string | Operator;
  min?: string | Operator;
}

interface SelectInput extends BasicInput {
  type: "select";
  widget: "select" | "optgroup" | "multiSelect";
  placeholder?: string;
  options: Option[];
  rules?: Rule[];
}

interface Option {
  label: string;
  value: string;
}

interface FieldArrayInput extends BasicInput {
  type: "array";
  max: number;
  min: number;
  items: Widget[];
  rules: Rule[];
}

interface FieldSection extends BasicInput {
  type: "section";
  items: {
    title: string;
    items: Widget[];
  };
  rules?: null;
}

type Arg = Operator | string | number;
export type Operator = [item1: string, ...otherItems: Arg[]];
export type FormValue = any;
export type FieldValue = any;

export interface Rule {
  rule: Operator;
  when?: Operator;
  errorMsg?: string;
}

export type ValidateFnCore = (value: FieldValue, formValue: FormValue) => boolean | FieldValue;
export type ValidateFnList = { [key: string]: (...arg: any[]) => ValidateFnCore };
