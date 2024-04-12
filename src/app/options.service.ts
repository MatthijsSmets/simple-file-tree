import {Injectable} from '@angular/core';
import {FileTreeOptions} from "./ng-simple-file-tree/models/file-tree-options";

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  public static options: FileTreeOptions;
  constructor() { }

  getOptions(): FileTreeOptions {
    return OptionsService.options
  }
}
