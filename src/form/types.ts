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
      onSuccess: RedirectAction | AlertAction;
    };
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

type StringWidget = "text" | "email";
type NumberWidget = "number" | "currency";
type DateWidget = "datepicker";
type BooleanWidget = "boolean";
type SelectWidget = "select" | "multiselect";

type WidgetUIType = StringWidget | NumberWidget | DateWidget | BooleanWidget | SelectWidget;

interface Action {
  type: string;
}

interface RedirectAction extends Action {
  type: "redirect";
  url?: string;
}

interface AlertAction extends Action {
  type: "alert";
  message?: string;
}

interface BasicInput {
  name: string;
  widget: WidgetUIType;
  title?: string;
  description?: string;
  defaultValue?: any;
  rules?: Rule[] | Rule[][];
}

interface StringInput extends BasicInput {
  type: "string";
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
  placeholder?: string;
  rules?: Rule[];
  max?: number;
  min?: number;
}

interface BooleanInput extends BasicInput {
  type: "boolean";
}

interface DateInput extends BasicInput {
  type: "date";
  defaultValue: string | string[];
  placeholder?: string | string[];
  rules?: Rule[] | Rule[][];
  max?: string | Operator;
  min?: string | Operator;
}

interface SelectInput extends BasicInput {
  type: "select";
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

type Arg = Operator | string | number;
type Operator = [item1: string, ...otherItems: Arg[]];
export type FormValue = any;
export type FieldValue = any;

interface Rule {
  rule: Operator;
  when?: Operator;
  errorMsg?: string;
}
