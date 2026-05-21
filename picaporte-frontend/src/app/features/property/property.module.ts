import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SharedModule } from '../../shared/shared.module';
import { PropertyDashboardComponent } from '../../dashboard-components/property-dashboard/property-dashboard.component';
import { PropertyComponent } from '../../property-components/property/property.component';
import { PropertyDetailComponent } from '../../property-components/property-detail/property-detail.component';
import { PropertyCaracteristicsComponent } from '../../property-components/property-caracteristics/property-caracteristics.component';
import { PropertyDocumentsComponent } from '../../property-components/property-documents/property-documents.component';
import { PropertyImagesComponent } from '../../property-components/property-images/property-images.component';
import { PropertyOnlineComponent } from '../../property-components/property-online/property-online.component';
import { PropertyRentingComponent } from '../../property-components/property-renting/property-renting.component';
import { RecommendedPropertiesComponent } from '../../property-components/recommended-properties/recommended-properties.component';
import { TaskComponent } from '../../property-components/property/task/task.component';

const routes: Routes = [
  { path: 'Imoveis', component: PropertyDashboardComponent },
  { path: 'Imovel', component: PropertyComponent },
  { path: 'Imovel/:id', component: PropertyComponent }
];

@NgModule({
  declarations: [
    PropertyDashboardComponent,
    PropertyComponent,
    PropertyDetailComponent,
    PropertyCaracteristicsComponent,
    PropertyDocumentsComponent,
    PropertyImagesComponent,
    PropertyOnlineComponent,
    PropertyRentingComponent,
    RecommendedPropertiesComponent,
    TaskComponent
  ],
  imports: [
    SharedModule,
    DragDropModule,
    RouterModule.forChild(routes)
  ]
})
export class PropertyModule {}
