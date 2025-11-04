import {Component, ViewChild} from '@angular/core';
import {NgSimpleFileTree} from "../../projects/ng-simple-file-tree/src/lib/ng-simple-file-tree.component";
import {FileTreeOptions} from "../../projects/ng-simple-file-tree/src/lib/models/file-tree-options";
import {CreateTreeItem} from "../../projects/ng-simple-file-tree/src/lib/models/create-tree-item";
import {FileTreeItem} from "../../projects/ng-simple-file-tree/src/lib/models/file-tree-item";

@Component({
    selector: 'app-root',
    imports: [NgSimpleFileTree],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('tree') tree!: NgSimpleFileTree;
  title = 'simple-file-tree';

  treeItems = [
    {
      name: 'helloworld',
      id:'123',
      children: [{
        name: 'helloworld.xml',
        id: "1#1",
        icon: 'assets/genetic-data-svgrepo-com.svg',
        children: [
          {
            name: 'adapter1a',
            id: "2#1",
          },
          {
            name: 'adapter1b',
            id: "2#2",
            children: [
              {name: 'test123', id: "3#1",},
              {name: 'test456', id: "3#2",}
            ]
          }
        ]
      },
        {
          name: 'settings.yml',
          id: "1#2",
        }
      ]
    },
    {name: ''},
    {
      name: 'helloworld.yml',
    },
    {
      name: 'application.properties',
    }
  ];

  options: FileTreeOptions = {
    determineIconClass: this.determineIcon,
    determineFontColor: this.determineFont,
    highlightOpenFolders: false,
    folderBehaviourOnClick: 'select',
    doubleClickToOpenFolders: false,
    expandAllFolders: false,
    hierarchyLines: {
      vertical: true
    },
    styles: {
      all: 'font-family: consolas',
    }
  }

  determineIcon(value: CreateTreeItem): string {
    return 'bi bi-1-circle-fill blue'
  }

  onSelectTreeItem(value: FileTreeItem) {
  }

  test(event: KeyboardEvent) {
    this.tree.searchTree((event.target as HTMLInputElement).value)
  }

  addItem() {
    this.tree.addItem({
      "startTime": 1712911767450,
      "endTime": 1712911767450,
      "correlationId": "37121118-c2b0-41cb-afcf-dda0892fa342",
      "name": "Another simple report",
      "description": null,
      "path": undefined,
      "stubStrategy": "Stub all external connection code",
      "checkpoints": [
        {
          "threadName": "http-nio-80-exec-3",
          "sourceClassName": null,
          "messageClassName": null,
          "name": "Another simple report",
          "message": "Hello World!",
          "encoding": null,
          "streaming": null,
          "waitingForStream": false,
          "noCloseReceivedForStream": false,
          "type": 1,
          "level": 0,
          "stub": -1,
          "stubbed": false,
          "stubNotFound": null,
          "preTruncatedMessageLength": -1,
          "index": 0,
          "typeAsString": "Startpoint",
          "uid": "1#0",
          "estimatedMemoryUsage": 24,
          "checkpoints": [
            {
              "threadName": "http-nio-80-exec-3",
              "sourceClassName": null,
              "messageClassName": null,
              "name": "Another simple report",
              "message": "Goodbye World!",
              "encoding": null,
              "streaming": null,
              "waitingForStream": false,
              "noCloseReceivedForStream": false,
              "type": 2,
              "level": 1,
              "stub": -1,
              "stubbed": false,
              "stubNotFound": null,
              "preTruncatedMessageLength": -1,
              "index": 1,
              "typeAsString": "Endpoint",
              "uid": "1#1",
              "estimatedMemoryUsage": 28
            }
          ]
        }
      ],
      "transformation": null,
      "variableCsv": null,
      "estimatedMemoryUsage": 52,
      "threadInfo": "\nmainThread: null\nmainThreadFinishedTime: -9223372036854775808\nthreads: []\nthreadCheckpointIndex: {}\nthreadFirstLevel: {}\nthreadLevel: {}\nthreadParent: {}\nthreadsActiveCount: 0\nstreamingMessageListeners: {}\ncloseThreads: false\ncloseNewThreadsOnly: false\ncloseMessageCapturers: false",
      "originalEndpointOrAbortpointForCurrentLevel": null,
      "storageId": 1,
      "fullPath": "/Another simple report",
      "inputCheckpoint": {
        "threadName": "http-nio-80-exec-3",
        "sourceClassName": null,
        "messageClassName": null,
        "name": "Another simple report",
        "message": "Hello World!",
        "encoding": null,
        "streaming": null,
        "waitingForStream": false,
        "noCloseReceivedForStream": false,
        "type": 1,
        "level": 0,
        "stub": -1,
        "stubbed": false,
        "stubNotFound": null,
        "preTruncatedMessageLength": -1,
        "index": 0,
        "typeAsString": "Startpoint",
        "uid": "1#0",
        "estimatedMemoryUsage": 24
      },
      "variablesAsMap": null,
      "numberOfCheckpoints": 2,
      "xml": "<Report Name=\"Another simple report\"\n        Description=\"\"\n        Path=\"\"\n        CorrelationId=\"Original length: 36\"\n        StartTime=\"Original length: 13\"\n        EndTime=\"Original length: 13\"\n        NumberOfCheckpoints=\"2\"\n        EstimatedMemoryUsage=\"52\">\n   <Checkpoint Name=\"Another simple report\" Type=\"Startpoint\" Level=\"0\">Hello World!</Checkpoint>\n   <Checkpoint Name=\"Another simple report\" Type=\"Endpoint\" Level=\"1\">Goodbye World!</Checkpoint>\n</Report>\n",
      "storageName": "Debug"
    }, {childrenKey: 'checkpoints'})
  }

  hideItem() {
    for (let element of this.tree.elements) {
      element.element.nativeElement.style.display = 'none'
    }
  }

  determineFont(item: CreateTreeItem): string {
    return 'red'
  }
}
