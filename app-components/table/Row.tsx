import { css } from "glamor";
import { get, map } from "lodash";
import React from "react";
import { Component } from "react";
import { Cell } from "./Cell";
import { LabelCell } from "./LabelCell";

export interface IColumn {
  fieldKey?: string;
  label?: string;
  labelRender?: () => JSX.Element | null;
  cellRender?: (item: any, dataSource: any[]) => JSX.Element | null;
  width?: string;
}

interface IRowProps {
  column: IColumn;
  dataSource: any[];
}

const rowStyles = css({
  display: "flex",
  padding: "2rem 0",
});

export class Row extends Component<IRowProps, any> {
  render() {
    const { column, dataSource } = this.props;
    return (
      <div {...rowStyles}>
        <Cell label={<LabelCell label={column.label} labelRender={column.labelRender} />} />
        {map(dataSource, (item: any, idx: number) => {
          if (column.cellRender) {
            return <Cell key={idx} value={column.cellRender(item, dataSource)} />;
          }
          if (column.fieldKey) {
            return <Cell key={idx} value={get(item, column.fieldKey)} />;
          }
          return null;
        })}
      </div>
    );
  }
}
