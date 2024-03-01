import {Component, Input, OnInit} from '@angular/core';
import {FileTreeOptions} from "../models/file-tree-options";
import {NgForOf} from "@angular/common";
import {TreeItemComponent} from "../tree-item/tree-item.component";
import {CreateTreeItem, FileTreeItem} from "../models/file-tree-item";

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
export class TreeComponent implements OnInit {
  @Input('data') public treeData!: (Partial<CreateTreeItem> & Pick<CreateTreeItem, 'name'> & Record<string, unknown>)[];
  @Input({alias: 'options', required: false}) options: FileTreeOptions = {
    highlightOpenFolders: false
  };
  public static options: FileTreeOptions;
  items: FileTreeItem[] = [];

  ngOnInit(): void {
    TreeComponent.options = this.options;
    this.createFileTreeItems();
  }

  createFileTreeItems(): void {
    for (let treeDatum of this.treeData) {
      this.items.push(FileTreeItem.fromJson(treeDatum))
    }
  }
}
