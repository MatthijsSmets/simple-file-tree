import {Component, Input, OnInit} from '@angular/core';
import {FileTreeItem} from "../models/file-tree-item";
import {SelectItemService} from "../../select-item.service";
import {NgSimpleFileTree} from "../ng-simple-file-tree.component";

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrl: './tree-item.component.css'
})
export class TreeItemComponent implements OnInit {
  @Input() item!: FileTreeItem;
  @Input() lastChild: boolean = false;
  @Input() index!: number;
  expanded?: boolean;
  justClicked: boolean = false;

  constructor(private selectItemService: SelectItemService) {
  }

  ngOnInit(): void {
    this.subscribeToItemService();
    this.initExpanded();
  }

  subscribeToItemService(): void {
    this.selectItemService.itemSelectedObservable.subscribe((value: FileTreeItem): void => {
      if (!this.justClicked) {
        this.item.currentlySelected = value.path == this.item.path ||
          (NgSimpleFileTree.options.highlightOpenFolders && this.getParentPath(value.path, value.name) == this.item.path);
        if (this.item.currentlySelected && this.item.parent) {
          this.item.parent.selectedChildIndex = this.index
        }
        //Set index to -1 if an item is selected that is not in the path
        if (this.item.parent && this.getParentPath(value.path, value.name) != this.item.parent.path) {
          this.item.parent.selectedChildIndex = -1
        }
      }
      this.justClicked = false;
    })
  }

  initExpanded(): void {
    if (this.item.hasChildren) {
      this.expanded = this.item.expanded;
    }
  }

  onClick(): void {
    if (this.item.hasChildren) {
      this.handleFolderClick();
    } else {
      this.item.currentlySelected = true;
      if (this.item.parent) {
        this.item.parent.selectedChildIndex = this.index
      }
    }
    this.justClicked = true;
    this.selectItemService.nextItem(this.item);
  }

  handleFolderClick() {
    if (NgSimpleFileTree.options.folderBehaviourOnClick !== 'select') {
      this.expanded = !this.expanded;
    }
    if (NgSimpleFileTree.options.folderBehaviourOnClick == 'both' || NgSimpleFileTree.options.folderBehaviourOnClick == 'select') {
      this.item.currentlySelected = true;
    }
  }

  getParentPath(childPath: string, childName: string): string {
    let parentPath: string = childPath.replace(childName, '');
    if (parentPath.endsWith('/')) {
      return parentPath.substring(0, parentPath.length - 1)
    }
    return parentPath;
  }

  onDoubleClick() {
    if (NgSimpleFileTree.options.folderBehaviourOnClick == 'doubleClick') {

    }
  }
}