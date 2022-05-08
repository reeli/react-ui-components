import { Widget } from "./types";
import { Field } from "./Field";

interface FieldListProps {
  widgets: Widget[];
}

export const FieldList = ({ widgets }: FieldListProps) => {
  return (
    <div>
      {widgets.map((widget, idx) => {
        if (widget.type === "array") {
          // TODO
          return <div>array</div>;
        }

        if (widget.type === "section") {
          // TODO
          return <div>section</div>;
        }

        return (
          <div>
            <Field {...widget} key={idx} />
          </div>
        );
      })}
    </div>
  );
};
