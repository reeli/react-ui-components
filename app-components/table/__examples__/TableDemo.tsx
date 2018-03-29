import * as React from 'react';
import { Table } from '../Table';
import { data, getColumns } from './data';

export class TableDemo extends React.Component<any, any> {
  render() {
    return <Table dataSource={data} columns={getColumns()} width='878px' />;
  }
}
