import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {TreeIconComponent} from "../tree-icon/tree-icon.component";
import {FileTreeItem} from "../models/file-tree-item";

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

  ngOnInit(): void {
    this.initExpanded();
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
  }
}
