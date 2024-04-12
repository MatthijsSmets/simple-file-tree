import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {FileTreeItem} from "./ng-simple-file-tree/models/file-tree-item";

@Injectable({
  providedIn: 'root'
})
export class SelectItemService {
  private itemSelectedSubject: ReplaySubject<FileTreeItem> = new ReplaySubject(1);
  public itemSelectedObservable: Observable<FileTreeItem> = this.itemSelectedSubject.asObservable();
  private lastValue!: FileTreeItem;

  public nextItem(value: FileTreeItem): void {
    this.lastValue = value;
    this.itemSelectedSubject.next(value);
  }

  public getLastSelected(): FileTreeItem {
    return this.lastValue;
  }
}
