import Editor from "@monaco-editor/react";
import { Form } from "../Form";
import { FormSpec } from "../types";
import { useState } from "react";
import { debounce } from "lodash";

const formSpec: FormSpec = {
  formId: "001",
  title: "Basic Form",
  description: "This is a basic form",
  widgets: [
    {
      type: "group",
      section: {
        title: "String Input",
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
        ],
      },
    },
    {
      type: "group",
      section: {
        title: "Boolean Input",
        widgets: [
          {
            name: "maritalStatus",
            type: "boolean",
            widget: "checkbox",
            label: "是否已婚",
            defaultValue: false,
          },
          {
            name: "showMore",
            type: "boolean",
            widget: "checkbox",
            label: "显示更多",
            defaultValue: false,
          },
        ],
      },
    },
    {
      name: "annualIncome",
      type: "string",
      widget: "text",
      label: "年收入",
      visible: ["eq", ["get", "showMore"], ["get", "maritalStatus"]],
      rules: [
        {
          rule: ["required"],
          errorMsg: "此字段为必填项",
        },
      ],
    },
    {
      type: "group",
      section: {
        title: "Select Input",
        widgets: [
          {
            name: "hobby",
            type: "select",
            widget: "select",
            label: "爱好",
            placeholder: "请填写爱好",
            options: [
              {
                id: "001",
                value: "swimming",
                label: "游泳",
              },
              {
                id: "002",
                value: "hiking",
                label: "徒步",
              },
              {
                id: "003",
                value: "ski",
                label: "滑雪",
              },
              {
                id: "004",
                value: "climbing",
                label: "登山",
              },
              {
                id: "005",
                value: "camping",
                label: "露营",
              },
            ],
          },
        ],
      },
    },
    {
      type: "group",
      section: {
        title: "Number Input",
        widgets: [
          {
            name: "age",
            type: "number",
            widget: "number",
            label: "年龄",
            placeholder: "请填写年龄",
            rules: [
              {
                rule: ["required"],
                errorMsg: "此字段为必填项",
              },
              {
                rule: ["all", ["gte", 18], ["lte", 55]],
                errorMsg: "年龄必须在 18 - 55 岁之间",
              },
            ],
          },
        ],
      },
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

  const handleChange = debounce((value: any) => {
    try {
      const data = JSON.parse(value);
      console.log(data, "data");
      setData(data);
    } catch (e) {}
  }, 1000);

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
