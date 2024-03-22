import {Child} from "./child";
import {CreateTreeItem} from "./create-tree-item";

export class FileTreeItem {
  name: string;
  path: string;

  private constructor(name: string, originalValue: any, optional: OptionalParameters) {
    this.index = optional.index
    this.originalValue = originalValue;
    this.parent = optional.parent;
    if (optional.path) {
      this.path = optional.path;
    } else {
      this.path = name;
    }
    this.name = name;
    if (name.includes('.')) {
      const split = name.split('.');
      this.extension = split[split.length - 1]
    }
    this.icon = optional.icon;
    if (optional.childrenKey) {
      this.childrenKey = optional.childrenKey;
      this.createChildren(originalValue[optional.childrenKey])
    } else if (optional.children && optional.children.length > 0) {
      this.createChildren(optional.children);
    }
  }

  extension?: string;
  children?: FileTreeItem[];
  icon?: string;
  parent?: FileTreeItem
  index?: number;

  currentlySelected: boolean = false;
  expanded: boolean = false;
  selectedChildIndex: number = -1
  originalValue: any;
  private readonly childrenKey?: string;

  public hasChildren(): boolean {
    return !!this.children && this.children.length > 0;
  }

  private createChildren(children: CreateTreeItem[]): void {
    let newChildrenList: FileTreeItem[] = [];
    for (let child of children) {
      if (child.childrenKey) {
        newChildrenList.push(new FileTreeItem(child.name, child,
          {
            childrenKey: child.childrenKey,
            children: child[child.childrenKey],
            icon: child.icon,
            path: this.path + "/" + child.name,
            parent: this
          }
        ));
      } else if (this.childrenKey && child[this.childrenKey]) {
        newChildrenList.push(new FileTreeItem(child.name, child,
          {
            childrenKey: this.childrenKey,
            children: child[this.childrenKey],
            icon: child.icon,
            path: this.path + "/" + child.name,
            parent: this
          }
        ));
      } else {
        newChildrenList.push(new FileTreeItem(child.name,
          child,
          {
            children: child.children,
            icon: child.icon,
            path: this.path + "/" + child.name,
            parent: this
          }
        ));
      }
    }
    this.children = newChildrenList;
  }

  public static fromJson(item: CreateTreeItem, childrenKey?: string): FileTreeItem {
    if (childrenKey) {
      return new FileTreeItem(
        item.name,
        item,
        {
          childrenKey: childrenKey,
          children: item[childrenKey],
          icon: item.icon,
          path: item.path
        }
      );
    }

    if (item.childrenKey) {
      return new FileTreeItem(
        item.name,
        item,
        {
          childrenKey: item.childrenKey,
          children: item[item.childrenKey],
          icon: item.icon,
          path: item.path
        }
      );
    }
    return new FileTreeItem(
      item.name,
      item,
      {
        children: item.children,
        icon: item.icon,
        path: item.path
      }
    );
  }
}

export interface OptionalParameters {
  childrenKey?: string;
  children?: Child[];
  icon?: string;
  path?: string;
  parent?: FileTreeItem;
  index?: number;
}
