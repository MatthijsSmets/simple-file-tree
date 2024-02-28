export type FileTreeItemModel = {
  name: string;
  path: string;
  currentlySelected: boolean;
  extension?: string;
  icon?: string;
} & (FolderTypeItemModel | FileItemModel);

export type FolderTypeItemModel = {
  hasChildren: true;
  children: FileTreeItemModel[];
  expanded: boolean;
};

export type FileItemModel = {
  hasChildren: false;
}
