import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';

import { SpinnerComponent } from '../utiity-components/spinner/spinner.component';
import { DashboardKpiComponent } from '../generic-components/dashboard-kpi/dashboard-kpi.component';
import { SearchAndFilterBarComponent } from '../generic-components/search-and-filter-bar/search-and-filter-bar.component';
import { MessageComponent } from '../generic-components/message/message.component';
import { ActivityLogComponent } from '../generic-components/activity-log/activity-log.component';
import { AddressComponent } from '../generic-components/address/address.component';
import { GoogleMapComponent } from '../generic-components/google-map/google-map.component';
import { DateFormatComponent } from '../generic-components/date-format/date-format.component';
import { CommaToDotDirective } from '../directives/comma-to-dot-directive/comma-to-dot.directive';
import { CustomerPreferencesComponent } from '../generic-components/preferences/preferences.component';

const SHARED_DECLARATIONS = [
  SpinnerComponent,
  DashboardKpiComponent,
  SearchAndFilterBarComponent,
  MessageComponent,
  ActivityLogComponent,
  AddressComponent,
  GoogleMapComponent,
  DateFormatComponent,
  CommaToDotDirective,
  CustomerPreferencesComponent
];

@NgModule({
  declarations: SHARED_DECLARATIONS,
  imports: [CommonModule, FormsModule, RouterModule, OverlayModule],
  exports: [...SHARED_DECLARATIONS, CommonModule, FormsModule, RouterModule]
})
export class SharedModule {}
