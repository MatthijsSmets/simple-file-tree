import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {TreeIconComponent} from "../tree-icon/tree-icon.component";
import {FileTreeItem} from "../models/file-tree-item";
import {SelectItemService} from "../select-item.service";
import {TreeComponent} from "../tree/tree.component";

@Component({
  selector: 'app-tree-item',
  standalone: true,
  imports: [
    NgClass,
    TreeIconComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './tree-item.component.html',
  styleUrl: './tree-item.component.css'
})
export class TreeItemComponent implements OnInit {
  @Input() item!: FileTreeItem;
  @Input() lastChild: boolean = false;
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
          (TreeComponent.options.highlightOpenFolders && this.getParentPath(value.path, value.name) == this.item.path);

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
      this.expanded = !this.expanded;
    }
    this.justClicked = true;
    this.item.currentlySelected = true;
    this.selectItemService.nextItem(this.item);
  }

  getParentPath(childPath: string, childName: string): string {
    let parentPath: string = childPath.replace(childName, '');
    if (parentPath.endsWith('/')) {
      return parentPath.substring(0, parentPath.length - 1)
    }
    return parentPath;
  }
}
