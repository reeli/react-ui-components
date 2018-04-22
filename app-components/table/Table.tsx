import { css } from 'glamor';
import { map } from 'lodash';
import * as React from 'react';
import { IColumn, Row } from './Row';

interface ITable {
  dataSource: any[];
  columns: IColumn[];
  width?: string;
}

export class Table extends React.Component<ITable, any> {
  render() {
    const { columns, dataSource, width = 'auto' } = this.props;
    return (
      <div {...css({ width })}>
        {map(columns, (column: any, idx: number) => {
          return <Row key={idx} dataSource={dataSource} column={column} />;
        })}
      </div>
    );
  }
}
