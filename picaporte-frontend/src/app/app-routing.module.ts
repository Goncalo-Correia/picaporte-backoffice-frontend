import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer-components/customer/customer.component';
import { CustomerDashboardComponent } from './dashboard-components/customer-dashboard/customer-dashboard.component';
import { DashboardComponent } from './dashboard-components/dashboard/dashboard.component';
import { PropertyDashboardComponent } from './dashboard-components/property-dashboard/property-dashboard.component';
import { UserDashboardComponent } from './dashboard-components/user-dashboard/user-dashboard.component';
import { PropertyComponent } from './property-components/property/property.component';
import { MonitoringAnalyticsComponent } from './router-components/monitoring-analytics/monitoring-analytics.component';
import { NewsComponent } from './router-components/news/news.component';
import { StaticDataComponent } from './router-components/static-data/static-data.component';
import { TasksComponent } from './router-components/tasks/tasks.component';
import { ToDosComponent } from './router-components/to-dos/to-dos.component';
import { UserComponent } from './user-components/user/user.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'Imoveis', component: PropertyDashboardComponent },
  { path: 'Imovel', component: PropertyComponent },
  { path: 'Imovel/:id', component: PropertyComponent },
  { path: 'Clientes', component: CustomerDashboardComponent },
  { path: 'Cliente', component: CustomerComponent },
  { path: 'Cliente/:id', component: CustomerComponent },
  { path: 'Utilizadores', component: UserDashboardComponent },
  { path: 'Utilizador', component: UserComponent },
  { path: 'Utilizador/:id', component: UserComponent },
  { path: 'Tarefas', component: TasksComponent },
  { path: 'Noticias', component: NewsComponent },
  { path: 'ToDos', component: ToDosComponent },
  { path: 'Estatisticas', component: MonitoringAnalyticsComponent },
  { path: 'GestaoDeDados', component: StaticDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
