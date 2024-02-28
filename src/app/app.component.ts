import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FileTreeItemModel} from "./models/file-tree-item-model";
import {TreeComponent} from "./tree/tree.component";
import {FileTreeOptions} from "./models/file-tree-options";
import {Child, FileTreeItem} from "./models/file-tree-item";
import {SelectItemService} from "./select-item.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'file-tree';

  treeItems: FileTreeItem[] = [
    new FileTreeItem('helloworld',
      [{
        name: 'helloworld.xml',
        children: [{name: 'adapter1a'}, {name: 'adapter1b'}]
      } as Child
      ]
    ),
    new FileTreeItem('helloworld.yml'),
    new FileTreeItem('application.properties')
  ];
  options: FileTreeOptions = {
    highlightOpenFolders: true,
  }
}
