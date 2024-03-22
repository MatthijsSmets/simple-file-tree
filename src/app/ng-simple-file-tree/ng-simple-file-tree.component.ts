import {Component, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FileTreeOptions} from "./models/file-tree-options";
import {FileTreeItem} from "./models/file-tree-item";
import {CreateTreeItem} from "./models/create-tree-item";
import {OptionsService} from "../options.service";
import {Subject, Subscription} from "rxjs";
import {SelectItemService} from "../select-item.service";


@Inject({
  providedIn: 'root',
})
@Component({
  selector: 'ng-simple-tree',
  templateUrl: './ng-simple-file-tree.component.html',
  styleUrl: './ng-simple-file-tree.component.css'
})
export class NgSimpleFileTree implements OnInit, OnDestroy {
  @Input('data') public treeData!: CreateTreeItem[];
  @Input({alias: 'options', required: false}) options: FileTreeOptions = {
    highlightOpenFolders: false,
    folderBehaviourOnClick: 'both',
    styles: {
      all: 'font-family: sans-serif'
    }
  };
  @Input('childrenKey') public childrenKey?: string;
  @Output() protected itemSelected: Subject<FileTreeItem> = new Subject<FileTreeItem>();
  protected itemSubscription!: Subscription;
  protected items: FileTreeItem[] = [];

  constructor(private optionsService: OptionsService, private itemService: SelectItemService) {
  }

  ngOnInit(): void {
    this.optionsService.options = this.options;
    this.createFileTreeItems();
    this.subscribeToItemService();
  }

  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
  }

  private createFileTreeItems(): void {
    if (this.treeData) {
      for (let treeDatum of this.treeData) {
        this.items.push(FileTreeItem.fromJson(treeDatum, this.childrenKey))
      }
    }
  }

  private subscribeToItemService(): void {
    this.itemSubscription = this.itemService.itemSelectedObservable
      .subscribe((value: FileTreeItem): void => {
        this.itemSelected.next(value);
      })
  }

  public getItems(): FileTreeItem[] {
    return this.items;
  }

  public getSelected(): FileTreeItem {
    return this.itemService.getLastSelected()
  }

  public addItem(item: CreateTreeItem): void {
    this.treeData.push(item);
    this.items.push(FileTreeItem.fromJson(item, this.childrenKey));
  }

  public clearItems(): void {
    this.items = [] as FileTreeItem[];
  }

  public expandAll(): void {
    this.setExpandedForAll(true);
  }

  public collapseAll(): void {
    this.setExpandedForAll(false);
  }

  private setExpandedForAll(value: boolean): void {
    for (let item of this.items) {
      item.expanded = value;
      if (item.hasChildren()) {
        this.setExpandedForChildren(item.children!, value)
      }
    }
  }

  private setExpandedForChildren(children: FileTreeItem[], value: boolean): void {
    for (let child of children) {
      child.expanded = value;
      if (child.hasChildren()) {
        this.setExpandedForChildren(child.children!, value);
      }
    }
  }
}
