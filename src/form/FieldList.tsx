import { Widget } from "./types";
import { Field } from "./Field";
import { Fragment } from "react";

interface FieldListProps {
  widgets: Widget[];
}

export const FieldList = ({ widgets }: FieldListProps) => {
  return (
    <Fragment>
      {widgets.map((widget, idx) => {
        if (widget.type === "array") {
          // TODO
          return <div key={idx}>array</div>;
        }

        if (widget.type === "section") {
          // TODO
          return <div key={idx}>section</div>;
        }

        return <Field {...widget} key={idx} />;
      })}
    </Fragment>
  );
};
