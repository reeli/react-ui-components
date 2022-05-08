import { Form } from "../Form";
import { FormSpec } from "../types";

const formSpec: FormSpec = {
  formId: "001",
  title: "Basic Form",
  description: "This is a basic form",
  widgets: [
    {
      name: "username",
      type: "string",
      widget: "text",
      label: "用户名",
      defaultValue: "Rui",
    },
    {
      name: "password",
      type: "string",
      widget: "text",
      label: "密码",
      props: {
        type: "password",
      },
      rules: [
        {
          rule: ["required"],
          errorMsg: "此字段为必填项",
        },
        {
          rule: ["maxLength", 10],
          errorMsg: "最大长度为 10 个字符",
        },
      ],
    },
  ],
  actions: {
    client: {
      onSubmit: {
        apiUrl: "xxx",
      },
      onSubmitSuccess: {
        type: "redirect",
        url: "xxx",
      },
      onSubmitFail: {
        type: "alert",
      },
    },
  },
  submit: {
    confirmText: "提交",
  },
};

export function FormExampleDemo() {
  return <Form formSpec={formSpec} />;
}
