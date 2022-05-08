import { Widget } from "./types";
import { Field } from "./Field";

interface FieldListProps {
  widgets: Widget[];
}

export const FieldList = ({ widgets }: FieldListProps) => {
  return (
    <>
      {widgets.map((widget) => {
        if (widget.type === "array") {
          // TODO
          return <div>array</div>;
        }
        if (widget.type === "section") {
          // TODO
          return <div>section</div>;
        }

        return <Field {...widget} />;
      })}
    </>
  );
};
