import {Component, Input, OnInit} from '@angular/core';
import {FileTreeItem} from "../models/file-tree-item";
import {SelectItemService} from "../../select-item.service";
import {OptionsService} from "../../options.service";

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

  constructor(private selectItemService: SelectItemService, public optionsService: OptionsService) {
  }

  ngOnInit(): void {
    this.subscribeToItemService();
    this.initExpanded();
  }

  subscribeToItemService(): void {
    this.selectItemService.itemSelectedObservable.subscribe((value: FileTreeItem): void => {
      if (!this.justClicked) {
        this.item.currentlySelected = value.path == this.item.path ||
          (this.optionsService.options.highlightOpenFolders && this.getParentPath(value.path, value.name) == this.item.path);
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
    if (this.item.hasChildren()) {
      this.expanded = this.item.expanded;
    }
  }

  onClick(): void {
    if (this.item.hasChildren()) {
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
    if (this.optionsService.options.folderBehaviourOnClick !== 'select') {
      this.expanded = !this.expanded;
    }
    if (this.optionsService.options.folderBehaviourOnClick == 'select' && this.item.currentlySelected) {
      this.expanded = !this.expanded;
    }
    if (this.optionsService.options.folderBehaviourOnClick == 'both' || this.optionsService.options.folderBehaviourOnClick == 'select') {
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

  shouldEnableVerticalLine(child: FileTreeItem, index: number) {
    return child.currentlySelected || this.item.selectedChildIndex > index
  }

  shouldEnableHorizontalLine(child: FileTreeItem): boolean {
    return !!((this.optionsService.options.hierarchyLines?.vertical || this.optionsService.options.hierarchyLines?.horizontal) && child.currentlySelected);
  }
}
