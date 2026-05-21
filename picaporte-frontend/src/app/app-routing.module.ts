import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { DashboardComponent } from './dashboard-components/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: AccessDeniedComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/property/property.module').then(m => m.PropertyModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/router-components/router-components.module').then(m => m.RouterComponentsModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
