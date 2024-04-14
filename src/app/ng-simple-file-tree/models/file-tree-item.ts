import {Child} from "./child";
import {CreateTreeItem} from "./create-tree-item";
import {OptionsService} from "../../options.service";

export class FileTreeItem {
  name: string;
  path: string;
  originalValue: any;

  private constructor(name: string, originalValue: any, optional: OptionalParameters) {
    if (optional.nameAttribute) {
      this.name = originalValue[optional.nameAttribute]
    } else {
      this.name = name;
    }
    if (!this.name) {
      this.name = 'null'
    }
    this.originalValue = originalValue;
    this.index = optional.index;
    this.parent = optional.parent;
    this.icon = optional.icon;
    this.pathAttribute = optional.pathAttribute;
    if (optional.pathAttribute && originalValue[optional.pathAttribute]) {
      this.path = optional.path ?? originalValue[optional.pathAttribute];
    } else {
      this.path = optional.path ?? this.name;
    }
    if (this.name && this.name.includes('.')) {
      const split = this.name.split('.');
      this.extension = split[split.length - 1];
    }

    if (optional.childrenKey) {
      this.childrenKey = optional.childrenKey;
      this.createChildren(originalValue[optional.childrenKey], optional);
    } else if (optional.children && optional.children.length > 0) {
      this.createChildren(optional.children, optional);
    } else {
      this.children = [] as FileTreeItem[];
    }
    this.expanded = !!(OptionsService.options.expandAllFolders && this.hasChildren());
  }

  extension?: string;
  children?: FileTreeItem[];
  icon?: string;
  parent?: FileTreeItem
  index?: number;

  currentlySelected: boolean = false;
  expanded!: boolean;
  selectedChildIndex: number = -1
  private readonly childrenKey?: string;
  public readonly pathAttribute?: string;
  fontColor?: string;

  public hasChildren(): boolean {
    return !!this.children && this.children.length > 0;
  }

  private createChildren(children: CreateTreeItem[], optional: OptionalParameters): void {
    let newChildrenList: FileTreeItem[] = [];
    if (children) {
      for (let child of children) {
        let children;
        if (optional.childrenKey) {
          children = child[optional.childrenKey]
        } else {
          children = child.children;
        }

        let name;
        if (optional.nameAttribute) {
          name = child[optional.nameAttribute];
        } else {
          name = child.name;
        }

        let path;
        if (optional.pathAttribute && optional.path) {
          path = optional.path + "/" + child[optional.pathAttribute]
        } else if (this.pathAttribute && optional.path) {
          path = optional.path + "/" + child[this.pathAttribute]
        } else if (child.path) {
          path = child.path + '/' + name;
        } else {
          path = optional.path + '/' + name;
        }

        if (this.childrenKey && child[this.childrenKey]) {
          children = child[this.childrenKey];
        }

        newChildrenList.push(new FileTreeItem(name,
          child,
          {
            childrenKey: this.childrenKey,
            children: children,
            icon: child.icon,
            path: path,
            parent: this,
            pathAttribute: this.pathAttribute ?? optional.pathAttribute,
            nameAttribute: optional.nameAttribute
          }
        ));
      }
      this.children = newChildrenList;
    }
  }

  getPathAttribute() {
    return this.pathAttribute ? this.originalValue[this.pathAttribute] : this.name;
  }

  public static fromJson(item: CreateTreeItem, optional: OptionalParameters): FileTreeItem {
    let name;
    if (optional.nameAttribute) {
      name = item[optional.nameAttribute]
    } else {
      name = item.name
    }
    let _childrenKey = optional.childrenKey;
    let children = item.children;
    let path = item.path ?? name;
    if (optional.pathAttribute && item[optional.pathAttribute]) {
      path = item[optional.pathAttribute]
    }
    if (_childrenKey) {
      children = item[_childrenKey];
    }
    item.path = path;
    return new FileTreeItem(
      name,
      item,
      {
        childrenKey: _childrenKey,
        children: children,
        icon: item.icon,
        path: path,
        pathAttribute: optional.pathAttribute
      }
    );
  }

  setFontColor(value: string) {
    this.fontColor = value;
  }
}

export interface OptionalParameters {
  pathAttribute?: string;
  childrenKey?: string;
  children?: Child[];
  icon?: string;
  path?: string;
  parent?: FileTreeItem;
  index?: number;
  nameAttribute?: string;
}
