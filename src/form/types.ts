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
}

export type Widget =
  | StringInput
  | NumberInput
  | DateInput
  | SelectInput
  | BooleanInput
  | SubmitInput
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
  rules?: Rule[] | Rule[][];
  props?: any;
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
}

interface FieldSection extends BasicInput {
  type: "section";
  items: {
    title: string;
    items: Widget[];
  };
}

export interface SubmitInput extends BasicInput {
  type: "submit";
  widget: "button";
  text: string;
}

type Arg = Operator | string | number;
type Operator = [item1: string, ...otherItems: Arg[]];
export type FormValue = any;
export type FieldValue = any;

interface Rule {
  rule: Operator;
  when?: Operator;
  errorMsg?: string;
}
