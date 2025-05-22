import {Component, Input} from '@angular/core';
import {FileTreeItem} from "../models/file-tree-item";
import {CommonModule} from '@angular/common';
import type {NgSimpleFileTree} from "../ng-simple-file-tree.component";

@Component({
  standalone: true,
  selector: 'app-tree-icon',
  templateUrl: './tree-icon.component.html',
  styleUrl: './tree-icon.component.css',
  imports: [CommonModule]
})
export class TreeIconComponent {
  @Input({required: true}) parentTree!: NgSimpleFileTree;
  @Input() item!: FileTreeItem;
  @Input() expanded?: boolean | null = false;

  hasExtension(value: string): boolean {
    let extensionWithDot;
    let extensionWithoutDot;
    if (this.item.extension && this.item.extension.startsWith('.')) {
      extensionWithDot = this.item.extension;
      extensionWithoutDot = this.item.extension.replace('.', '')
    } else {
      extensionWithDot = '.' + this.item.extension;
      extensionWithoutDot = this.item.extension;
    }
    return value == extensionWithoutDot || value == extensionWithDot
  }

  toggleExpanded(event: Event): void {
    event.stopPropagation();
    this.item.expanded = !this.item.expanded
  }
}
