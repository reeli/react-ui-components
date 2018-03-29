import { css } from 'glamor';
import { map } from 'lodash';
import * as React from 'react';
import { Column, IColumn } from './Column';

interface ITable {
  dataSource: any[];
  columns: IColumn[];
  width?: string;
}

const tableStyles = css({
  display: 'flex',
});

export class Table extends React.Component<ITable, any> {
  render() {
    const { columns, dataSource, width = 'auto' } = this.props;
    return (
      <div {...css(tableStyles, { width })}>
        {map(columns, (column: any, idx: number) => {
          return <Column key={idx} dataSource={dataSource} column={column} />;
        })}
      </div>
    );
  }
}
