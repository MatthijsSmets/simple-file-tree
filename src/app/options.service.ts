import {Injectable} from '@angular/core';
import {FileTreeOptions} from "./ng-simple-file-tree/models/file-tree-options";

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  public options!: FileTreeOptions;
  constructor() { }
}
