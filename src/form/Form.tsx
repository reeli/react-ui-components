import { useForm } from "react-hook-form";
import { FormValue, FormSpec } from "./types";
import { FieldList } from "./FieldList";

interface FormProps {
  formSpec: FormSpec;
}

export const Form = ({ formSpec }: FormProps) => {
  const { handleSubmit } = useForm();

  const onSubmit = (data: FormValue) => {
    console.log(data);
    // axios.post(formSpec.actions.client.onSubmit.apiUrl, data);
  };

  // const onSubmitSuccess = () => {};
  //
  // const onSubmitFail = () => {};

  return (
    <>
      {formSpec.title && <div>{formSpec.title}</div>}
      {formSpec.description && <div>{formSpec.description}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldList widgets={formSpec.widgets} />
        <button type={"submit"}>submit</button>
      </form>
    </>
  );
};
