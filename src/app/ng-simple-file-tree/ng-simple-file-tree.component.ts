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
  @Input('data') public treeData!: (Partial<CreateTreeItem> & Pick<CreateTreeItem, 'name'> & Record<string, unknown>)[];
  @Input({alias: 'options', required: false}) options: FileTreeOptions = {
    highlightOpenFolders: false,
    folderBehaviourOnClick: 'both',
    styles: {
      all: 'font-family: sans-serif'
    }
  };
  @Output() itemSelected: Subject<FileTreeItem> = new Subject<FileTreeItem>();
  itemSubscription!: Subscription;
  items: FileTreeItem[] = [];

  constructor(private optionsService: OptionsService, private itemService: SelectItemService) {
  }

  ngOnInit(): void {
    this.optionsService.options = this.options;
    this.createFileTreeItems();
    this.subscribeToItemService();
  }

  ngOnDestroy() {
    this.itemSubscription.unsubscribe();
  }

  private createFileTreeItems(): void {
    for (let treeDatum of this.treeData) {
      this.items.push(FileTreeItem.fromJson(treeDatum))
    }
  }

  private subscribeToItemService(): void {
    this.itemSubscription = this.itemService.itemSelectedObservable
      .subscribe((value: FileTreeItem): void => {
        this.itemSelected.next(value);
      })
  }

  public addItem(item: CreateTreeItem): void {
    this.items.push(FileTreeItem.fromJson(item))
  }
}
