import {Component, Input, OnInit} from '@angular/core';
import {FileTreeOptions} from "./models/file-tree-options";
import {FileTreeItem} from "./models/file-tree-item";
import {CreateTreeItem} from "./models/create-tree-item";

@Component({
  selector: 'app-tree',
  templateUrl: './ng-simple-file-tree.component.html',
  styleUrl: './ng-simple-file-tree.component.css'
})
export class NgSimpleFileTree implements OnInit {
  @Input('data') public treeData!: (Partial<CreateTreeItem> & Pick<CreateTreeItem, 'name'> & Record<string, unknown>)[];
  @Input({alias: 'options', required: false}) options: FileTreeOptions = {
    highlightOpenFolders: false,
    folderBehaviourOnClick: 'both'
  };
  public static options: FileTreeOptions;
  items: FileTreeItem[] = [];

  ngOnInit(): void {
    NgSimpleFileTree.options = this.options;
    this.createFileTreeItems();
  }

  createFileTreeItems(): void {
    for (let treeDatum of this.treeData) {
      this.items.push(FileTreeItem.fromJson(treeDatum))
    }
  }
}
