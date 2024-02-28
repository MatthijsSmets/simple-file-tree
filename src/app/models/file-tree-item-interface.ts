export interface FileTreeItemModel {
  name: string;
  path: string;
  currentlySelected: boolean;
  extension?: string;
  icon?: string;
  hasChildren: boolean;
  children?: FileTreeItemModel[];
  expanded?: boolean;
}
