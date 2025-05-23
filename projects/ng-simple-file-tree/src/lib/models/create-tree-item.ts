import {Child} from "./child";

export type CreateTreeItem = {
  name: string,
  childrenKey?: string;
  children?: Child[],
  icon?: string;
  treePath?: string;
  [key: string]: any;
}
