import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FileTreeOptions} from "./ng-simple-file-tree/models/file-tree-options";
import {Child} from "./ng-simple-file-tree/models/child";
import {NgSimpleFileTreeModule} from "./ng-simple-file-tree/ng-simple-file-tree.module";

@Component({
  selector: 'ng-simple-file-tree',
  standalone: true,
  imports: [RouterOutlet, NgSimpleFileTreeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'file-tree';

  treeItems = [
    {
      name: 'helloworld',
      children: [{
        name: 'helloworld.xml',
        icon: 'assets/genetic-data-svgrepo-com.svg',
        children: [{name: 'adapter1a'}, {name: 'adapter1b'}]
      },
        {name: 'settings.yml'} as Child
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
