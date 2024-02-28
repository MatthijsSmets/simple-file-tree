export class FileTreeItem {
  name: string;
  path: string;
  hasChildren: boolean;

  constructor(name: string, children?: Child[], icon?: string, path?: string) {
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
    this.hasChildren = !!children;
    this.icon = icon;
    if (children && children.length > 0) {
      this.createChildren(children);
    }
  }

  extension?: string;

  children?: FileTreeItem[];
  icon?: string;

  currentlySelected: boolean = false;
  expanded: boolean = false;

  private createChildren(children: Child[]) {
    let newChildrenList = [] as FileTreeItem[];
    for (let child of children) {
      newChildrenList.push(new FileTreeItem(child.name, child.children, child.icon, this.path + "/" + child.name));
    }
    this.children = newChildrenList;
  }
}

export type Child = {
  name: string,
  children: Child[],
  icon?: string;
}
