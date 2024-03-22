import {Child} from "./child";

export type CreateTreeItem = {
  name: string,
  childrenKey?: string;
  children?: Child[],
  icon?: string;
  path?: string;
  [key: string]: any;
}
