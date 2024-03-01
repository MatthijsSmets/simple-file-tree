import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { NgSimpleFileTree } from './app/ng-simple-file-tree.component';

bootstrapApplication(NgSimpleFileTree, appConfig)
  .catch((err) => console.error(err));
