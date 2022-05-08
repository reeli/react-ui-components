import { Form } from "../Form";
import { StringInput, RedirectAction, AlertAction, SubmitInput } from "../types";

const formSpec = {
  formId: "001",
  title: "Basic Form",
  description: "This is a basic form",
  widgets: [
    {
      name: "username",
      type: "string",
      widget: "text",
      label: "Username",
      defaultValue: "Rui",
    } as StringInput,
    {
      name: "password",
      type: "string",
      widget: "text",
      label: "Password",
      props: {
        type: "password",
      },
    } as StringInput,
    {
      name: "submit",
      type: "submit",
      widget: "button",
      text: "Submit",
    } as SubmitInput,
  ],
  actions: {
    client: {
      onSubmit: {
        apiUrl: "xxx",
      },
      onSubmitSuccess: {
        type: "redirect",
        url: "xxx",
      } as RedirectAction,
      onSubmitFail: {
        type: "alert",
      } as AlertAction,
    },
    server: {},
  },
};

export function FormExampleDemo() {
  return <Form formSpec={formSpec} />;
}
