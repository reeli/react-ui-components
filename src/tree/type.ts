import { ReactNode } from "react";

export interface TreeNode {
  id: string,
  parentId: string | null
  title: ReactNode;
  collapsed: boolean | null;
  checked: boolean;
  // disableCheckbox?: boolean,
  // disabled?: boolean;
}

export interface TreeData {
  id: string;
  parentId: string | null;
  title: ReactNode;
  collapsed: boolean | null;
  checked: boolean;
  children?: TreeData[]
}

export interface DataNode {
  title: ReactNode;
  key: string,
  children?: DataNode[],
  // disableCheckbox?: boolean,
  // disabled?: boolean;
}
