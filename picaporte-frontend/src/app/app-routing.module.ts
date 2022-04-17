import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer-components/customer/customer.component';
import { CustomerDashboardComponent } from './dashboard-components/customer-dashboard/customer-dashboard.component';
import { HomeComponent } from './router-components/home/home.component';
import { MonitoringAnalyticsComponent } from './router-components/monitoring-analytics/monitoring-analytics.component';
import { NewsComponent } from './router-components/news/news.component';
import { PropertiesComponent } from './router-components/properties/properties.component';
import { TasksComponent } from './router-components/tasks/tasks.component';
import { ToDosComponent } from './router-components/to-dos/to-dos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Imoveis', component: PropertiesComponent },
  { path: 'Clientes', component: CustomerDashboardComponent },
  { path: 'Cliente/:id', component: CustomerComponent },
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
