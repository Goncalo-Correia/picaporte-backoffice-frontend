import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './router-components/customers/customers.component';
import { HomeComponent } from './router-components/home/home.component';
import { MonitoringAnalyticsComponent } from './router-components/monitoring-analytics/monitoring-analytics.component';
import { NewsComponent } from './router-components/news/news.component';
import { PropertiesComponent } from './router-components/properties/properties.component';
import { TasksComponent } from './router-components/tasks/tasks.component';
import { ToDosComponent } from './router-components/to-dos/to-dos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Imoveis', component: PropertiesComponent },
  { path: 'Clientes', component: CustomersComponent },
  { path: 'Tarefas', component: TasksComponent },
  { path: 'Noticias', component: NewsComponent },
  { path: 'ToDos', component: ToDosComponent },
  { path: 'Estatisticas', component: MonitoringAnalyticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
