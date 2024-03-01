import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {FileTreeItem} from "../models/file-tree-item";

@Component({
  selector: 'app-tree-icon',
  host: {

  },
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './tree-icon.component.html',
  styleUrl: './tree-icon.component.css'
})
export class TreeIconComponent {
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
}
