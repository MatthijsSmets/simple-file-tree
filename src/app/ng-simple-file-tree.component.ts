import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TreeComponent} from "./tree/tree.component";
import {FileTreeOptions} from "./models/file-tree-options";
import {Child} from "./models/file-tree-item";

@Component({
  selector: 'ng-simple-file-tree',
  standalone: true,
  imports: [RouterOutlet, TreeComponent],
  templateUrl: './ng-simple-file-tree.component.html',
  styleUrl: './ng-simple-file-tree.component.css'
})
export class NgSimpleFileTree {
  title = 'file-tree';

  treeItems = [
    {
      name: 'helloworld',
      children: [{
        name: 'helloworld.xml',
        icon: 'assets/genetic-data-svgrepo-com.svg',
        children: [{name: 'adapter1a'}, {name: 'adapter1b'}]
      } as Child
      ]
    },
    {name: 'helloworld.yml'},
    {name: 'application.properties'}
  ];
  options: FileTreeOptions = {
    highlightOpenFolders: false,
    folderBehaviourOnClick: 'both'
  }
}
