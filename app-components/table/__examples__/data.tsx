import { map } from 'lodash';

export const data = map(new Array(5), (_: any, index: number) => {
  return {
    id: `id${index}`,
    crm: 'crm data',
    mini: 'mini data',
    rule: 'rule data',
    from: '2018/04/15 00:00 ',
    to: '2018/06/10 23:59',
  };
});

export const getColumns = () => {
  return [
    {
      label: 'test1',
      fieldKey: 'id',
      width: '30%',
    },
    {
      label: 'test2',
      fieldKey: 'crm',
      width: '50%',
    },
    {
      label: 'test3',
      fieldKey: 'rule',
      width: '10%',
    },
    {
      label: 'test4',
      fieldKey: 'crm',
      width: '10%',
    },
  ];
};
