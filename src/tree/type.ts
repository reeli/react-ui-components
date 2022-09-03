import { ReactNode } from "react";

export interface TreeNode {
  id: string,
  parentId: string | null
  title: ReactNode;
  // visible: boolean;
  checked: boolean;
  // disableCheckbox?: boolean,
  // disabled?: boolean;
}

export interface DataNode {
  title: ReactNode;
  key: string,
  children?: DataNode[],
  // disableCheckbox?: boolean,
  // disabled?: boolean;
}
