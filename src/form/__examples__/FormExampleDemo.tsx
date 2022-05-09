import Editor from "@monaco-editor/react";
import { Form } from "../Form";
import { FormSpec } from "../types";
import { useState } from "react";

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
      rules: [
        {
          rule: ["required"],
          errorMsg: "用户名为必填项",
        },
      ],
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
    {
      name: "maritalStatus",
      type: "boolean",
      widget: "switch",
      label: "是否已婚",
      defaultValue: false,
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
  const [data, setData] = useState(formSpec);

  const handleChange = (value: any) => {
    try {
      const data = JSON.parse(value);
      setData(data);
    } catch (e) {}
  };

  return (
    <div css={{ display: "flex" }}>
      <div css={{ flex: 1 }}>
        <Editor
          height="500vh"
          defaultLanguage="json"
          defaultValue={JSON.stringify(data, null, 2)}
          options={{ minimap: { enabled: false } }}
          onChange={handleChange}
        />
      </div>
      <div css={{ flex: 1, padding: 20 }}>
        <Form formSpec={data} />
      </div>
    </div>
  );
}
