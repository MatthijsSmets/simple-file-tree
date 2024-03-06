import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {FileTreeItem} from "./ng-simple-file-tree/models/file-tree-item";

@Injectable({
  providedIn: 'root'
})
export class SelectItemService {
  private itemSelectedSubject: Subject<FileTreeItem> = new ReplaySubject(1);
  public itemSelectedObservable: Observable<FileTreeItem> = this.itemSelectedSubject.asObservable();

  nextItem(value: FileTreeItem): void {
    this.itemSelectedSubject.next(value);
  }
}
