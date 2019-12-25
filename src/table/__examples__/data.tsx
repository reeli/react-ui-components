import { map } from "lodash";

export const data = map(new Array(5), (_: any, index: number) => {
  return {
    id: `id${index}`,
    crm: "crm data",
    mini: "mini data",
    rule: "rule data",
    from: "2018/04/15 00:00 ",
    to: "2018/06/10 23:59",
  };
});

export const getColumns = () => {
  return [
    {
      label: "test1",
      fieldKey: "id",
    },
    {
      label: "test2",
      fieldKey: "crm",
    },
    {
      label: "test3",
      fieldKey: "rule",
    },
    {
      label: "test4test4test4",
      fieldKey: "from",
    },
  ];
};
