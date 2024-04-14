import {Component, Input, OnInit, ViewChild,  ElementRef} from '@angular/core';
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
  @ViewChild('element') element!: ElementRef<HTMLElement>;
  @ViewChild('childElement') childElement!: TreeItemComponent;
  justClicked: boolean = false;
  protected visible: boolean = true;

  constructor(private selectItemService: SelectItemService, public optionsService: OptionsService) {
  }

  ngOnInit(): void {
    this.subscribeToItemService();
    if (this.optionsService.getOptions().autoOpenCondition) {
      this.item.expanded = this.optionsService.getOptions().autoOpenCondition!(this.item.originalValue)
    }
  }

  subscribeToItemService(): void {
    this.selectItemService.itemSelectedObservable.subscribe((value: FileTreeItem): void => {
      if (!this.justClicked) {
        this.item.currentlySelected = value.path == this.item.path ||
          (this.optionsService.getOptions().highlightOpenFolders && this.getParentPath(value) === this.item.path);
        if (this.item.currentlySelected && this.item.parent) {
          this.item.parent.selectedChildIndex = this.index
        }
        //Set index to -1 if an item is selected that is not in the path
        if (this.item.parent && this.getParentPath(value) !== this.item.parent.path) {
          this.item.parent.selectedChildIndex = -1
        }
      }
      this.justClicked = false;
    })
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

  handleFolderClick(): void {
    if (this.optionsService.getOptions().folderBehaviourOnClick !== 'select') {
      this.item.expanded = !this.item.expanded;
    }
    if (this.optionsService.getOptions().folderBehaviourOnClick == 'select' && this.item.currentlySelected) {
      this.item.expanded = !this.item.expanded;
    }
    if (this.optionsService.getOptions().folderBehaviourOnClick == 'both' || this.optionsService.getOptions().folderBehaviourOnClick == 'select') {
      this.item.currentlySelected = true;
    }
  }

  getParentPath(value: FileTreeItem): string {
    let parentPath: string = value.path.replace(value.getPathAttribute(), '');
    if (parentPath.endsWith('/')) {
      return parentPath.substring(0, parentPath.length - 1)
    }
    return parentPath;
  }

  shouldEnableVerticalLine(child: FileTreeItem, index: number) {
    return child.currentlySelected || this.item.selectedChildIndex > index
  }

  shouldEnableHorizontalLine(item: FileTreeItem): boolean {
    return !!((this.optionsService.getOptions().hierarchyLines?.vertical || this.optionsService.getOptions().hierarchyLines?.horizontal) && item.currentlySelected);
  }

  setVisible(value: boolean): void {
    this.visible = value;
  }
}
