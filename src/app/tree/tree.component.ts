import {Component, Input} from '@angular/core';
import {FileTreeOptions} from "../models/file-tree-options";
import {NgForOf} from "@angular/common";
import {TreeItemComponent} from "../tree-item/tree-item.component";
import {FileTreeItem} from "../models/file-tree-item";

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [
    NgForOf,
    TreeItemComponent
  ],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css'
})
export class TreeComponent {
  @Input('data') public treeData: FileTreeItem[] = [];
  @Input({alias: 'options', required: false}) options: FileTreeOptions = {
    highlightOpenFolders: false
  };
  public static options: FileTreeOptions;

  constructor() {
    TreeComponent.options = this.options;
  }
}
