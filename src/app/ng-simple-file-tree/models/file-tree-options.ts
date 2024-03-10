export interface FileTreeOptions {
  highlightOpenFolders: boolean;
  folderBehaviourOnClick: 'select' | 'expand' | 'both';
  hierarchyLines?: {
    vertical?: boolean,
    horizontal?: boolean,
  },
  styles?: {
    all?: string,
    treeItem?: {
      default?: string,
      active?: string,
    },
    treeIcon?: string,
    chevron?: string,
    hierarchyLine?: {
      horizontal?: string,
      vertical?: {
        default?: string,
        active?: string,
      },
    },
  }
}
