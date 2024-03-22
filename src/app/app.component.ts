import {Component, ViewChild} from '@angular/core';
import {FileTreeOptions} from "./ng-simple-file-tree/models/file-tree-options";
import {NgSimpleFileTreeModule} from "./ng-simple-file-tree/ng-simple-file-tree.module";
import {NgSimpleFileTree} from "./ng-simple-file-tree/ng-simple-file-tree.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgSimpleFileTreeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('tree') tree!: NgSimpleFileTree;
  title = 'simple-file-tree';

  treeItems = [
    {
      name: 'helloworld',
      children: [{
        name: 'helloworld.xml',
        icon: 'assets/genetic-data-svgrepo-com.svg',
        children: [
          {name: 'adapter1a'},
          {
            name: 'adapter1b', children: [
              {name: 'test123'}, {name: 'test456'}
            ]
          }
        ]
      },
        {name: 'settings.yml'}
      ]
    },
    {name: 'helloworld.yml'},
    {name: 'application.properties'}
  ];
  options: FileTreeOptions = {
    highlightOpenFolders: false,
    folderBehaviourOnClick: 'expand',
    hierarchyLines: {
      vertical: true
    },
    styles: {
      all: 'font-family: consolas',
    }
  }
}
