import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { UserDashboardComponent } from '../../dashboard-components/user-dashboard/user-dashboard.component';
import { UserComponent } from '../../user-components/user/user.component';
import { UserDetailComponent } from '../../user-components/user-detail/user-detail.component';

const routes: Routes = [
  { path: 'Utilizadores', component: UserDashboardComponent },
  { path: 'Utilizador', component: UserComponent },
  { path: 'Utilizador/:id', component: UserComponent }
];

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserComponent,
    UserDetailComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule {}
