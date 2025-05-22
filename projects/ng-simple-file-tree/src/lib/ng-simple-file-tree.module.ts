import {NgModule} from '@angular/core';
import {NgSimpleFileTree} from './ng-simple-file-tree.component';
import {TreeItemComponent} from './tree-item/tree-item.component';
import {TreeIconComponent} from './tree-icon/tree-icon.component';

@NgModule({
  imports: [
    NgSimpleFileTree,
    TreeItemComponent,
    TreeIconComponent
  ],
  exports: [
    NgSimpleFileTree,
    TreeItemComponent,
    TreeIconComponent
  ]
})
export class NgSimpleFileTreeModule {}