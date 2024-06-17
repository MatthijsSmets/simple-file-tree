# Simple-file-tree
Simple file tree for displaying files in a tree structure made with angular

File tree can be configured with the following options:
```typescript

export const folderBehavior = ['select', 'expand', 'both'] as const;
export type folderBehaviorType = typeof folderBehavior;

export interface FileTreeOptions {
  highlightOpenFolders: boolean;
  folderBehaviourOnClick: folderBehaviorType[number];
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

```

Example:
```typescript
  options = {
    highlightOpenFolders: false,
    folderBehaviourOnClick: 'expand',
    hierarchyLines: {
      vertical: true
    },
    styles: {
      all: 'font-family: consolas',
    }
  }
```

File extensions are automatically inferred by getting the value at the end of the filename after `.`:
so `login.spec.js` would have extension `.js` 

You can also use the determineIconClass function to add icons with any package you want, so if you use bootstrap icons you could do:
```typescript
function determineIcon(value: CreateTreeItem): string {
  return 'bi bi-1-circle-fill'
}
```
And if you want to add color you can define a css class with color:
```css
.red {
  color: red;
}
```
and then pass that class as well
```typescript
function determineIcon(value: CreateTreeItem): string {
  return 'bi bi-1-circle-fill red'
}
```
