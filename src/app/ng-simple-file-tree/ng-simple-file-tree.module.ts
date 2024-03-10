import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgSimpleFileTree} from "./ng-simple-file-tree.component";
import {TreeIconComponent} from "./tree-icon/tree-icon.component";
import {TreeItemComponent} from "./tree-item/tree-item.component";
import {OptionsService} from "../options.service";
import {SelectItemService} from "../select-item.service";


@NgModule({
  declarations: [
    NgSimpleFileTree,
    TreeItemComponent,
    TreeIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgSimpleFileTree,
    TreeItemComponent,
    TreeIconComponent
  ],
  providers: [
    OptionsService,
    SelectItemService
  ]
})
export class NgSimpleFileTreeModule {
}
