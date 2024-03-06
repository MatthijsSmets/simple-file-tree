import {Child} from "./child";

export type CreateTreeItem = {
  name: string,
  children?: Child[],
  icon?: string;
  path?: string;
}
