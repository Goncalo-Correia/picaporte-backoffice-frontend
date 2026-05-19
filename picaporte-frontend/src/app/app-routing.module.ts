import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { CustomerComponent } from './customer-components/customer/customer.component';
import { CustomerDashboardComponent } from './dashboard-components/customer-dashboard/customer-dashboard.component';
import { DashboardComponent } from './dashboard-components/dashboard/dashboard.component';
import { PropertyDashboardComponent } from './dashboard-components/property-dashboard/property-dashboard.component';
import { UserDashboardComponent } from './dashboard-components/user-dashboard/user-dashboard.component';
import { PropertyComponent } from './property-components/property/property.component';
import { LinksComponent } from './router-components/links/links.component';
import { NewsComponent } from './router-components/news/news.component';
import { StaticDataComponent } from './router-components/static-data/static-data.component';
import { TasksComponent } from './router-components/tasks/tasks.component';
import { ToDosComponent } from './router-components/to-dos/to-dos.component';
import { UserComponent } from './user-components/user/user.component';
import { LoginComponent } from './login/login.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: AccessDeniedComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'Imoveis', component: PropertyDashboardComponent, canActivate: [AuthGuard] },
  { path: 'Imovel', component: PropertyComponent, canActivate: [AuthGuard] },
  { path: 'Imovel/:id', component: PropertyComponent, canActivate: [AuthGuard] },
  { path: 'Clientes', component: CustomerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'Cliente', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'Cliente/:id', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'Utilizadores', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'Utilizador', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'Utilizador/:id', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'Tarefas', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'Noticias', component: NewsComponent, canActivate: [AuthGuard] },
  { path: 'ToDos', component: ToDosComponent, canActivate: [AuthGuard] },
  { path: 'Links', component: LinksComponent, canActivate: [AuthGuard] },
  { path: 'GestaoDeDados', component: StaticDataComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
