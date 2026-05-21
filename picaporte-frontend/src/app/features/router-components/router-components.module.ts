import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { SharedModule } from '../../shared/shared.module';
import { NewsComponent } from '../../router-components/news/news.component';
import { ToDosComponent } from '../../router-components/to-dos/to-dos.component';
import { TasksComponent } from '../../router-components/tasks/tasks.component';
import { StaticDataComponent } from '../../router-components/static-data/static-data.component';

const routes: Routes = [
  { path: 'Noticias', component: NewsComponent },
  { path: 'ToDos', component: ToDosComponent },
  { path: 'Tarefas', component: TasksComponent },
  { path: 'GestaoDeDados', component: StaticDataComponent }
];

@NgModule({
  declarations: [
    NewsComponent,
    ToDosComponent,
    TasksComponent,
    StaticDataComponent
  ],
  imports: [
    SharedModule,
    DragDropModule,
    CKEditorModule,
    RouterModule.forChild(routes)
  ]
})
export class RouterComponentsModule {}
