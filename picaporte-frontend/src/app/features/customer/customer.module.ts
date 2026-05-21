import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { CustomerDashboardComponent } from '../../dashboard-components/customer-dashboard/customer-dashboard.component';
import { CustomerComponent } from '../../customer-components/customer/customer.component';
import { CustomerDetailComponent } from '../../customer-components/customer-detail/customer-detail.component';
import { CustomerPropertiesComponent } from '../../customer-components/customer-properties/customer-properties.component';

const routes: Routes = [
  { path: 'Clientes', component: CustomerDashboardComponent },
  { path: 'Cliente', component: CustomerComponent },
  { path: 'Cliente/:id', component: CustomerComponent }
];

@NgModule({
  declarations: [
    CustomerDashboardComponent,
    CustomerComponent,
    CustomerDetailComponent,
    CustomerPropertiesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerModule {}
