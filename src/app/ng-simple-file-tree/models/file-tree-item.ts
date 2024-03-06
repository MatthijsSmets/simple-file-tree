import {Child} from "./child";
import {CreateTreeItem} from "./create-tree-item";

export class FileTreeItem {
  name: string;
  path: string;
  hasChildren: boolean;
  private constructor(name: string, children?: Child[], icon?: string, path?: string, parent?: FileTreeItem, index?: number) {
    this.index = index
    if (path) {
      this.path = path;
    } else {
      this.path = name;
    }
    this.name = name;
    if (name.includes('.')) {
      const split = name.split('.');
      this.extension = split[split.length - 1]
    }
    this.hasChildren = !!children && children.length > 0;
    this.icon = icon;
    if (children && children.length > 0) {
      this.createChildren(children);
    }
    if (parent) {
      this.parent = parent;
    }
  }

  extension?: string;
  children?: FileTreeItem[];
  icon?: string;
  parent?: FileTreeItem
  index?: number;

  currentlySelected: boolean = false;
  expanded: boolean = true;
  selectedChildIndex: number = -1

  private createChildren(children: Child[]): void {
    let newChildrenList: FileTreeItem[] = [];
    for (let child of children) {
      newChildrenList.push(new FileTreeItem(child.name, child.children, child.icon, this.path + "/" + child.name, this));
    }
    this.children = newChildrenList;
  }

  public static fromJson({
                           name,
                           children = [],
                           icon,
                           path
                         }: Partial<CreateTreeItem> & Pick<CreateTreeItem, 'name'> & Record<string, unknown>): FileTreeItem {
    return new FileTreeItem(name, children, icon, path);
  }
}
