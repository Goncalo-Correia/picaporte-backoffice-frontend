import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LightboxService } from 'src/app/shared/lightbox/lightbox.service';
import { catchError } from 'rxjs';
import { QueriesPropertyService } from 'src/app/api-service/queries-property/queries-property.service';
import { StaticAmenetieTypeService } from 'src/app/api-service/static-amenetie-type/static-amenetie-type-service.service';
import { StaticPropertyConditionStatusService } from 'src/app/api-service/static-property-condition-status/property-condition-status.service';
import { StaticPropertyLocationTypeService } from 'src/app/api-service/static-property-location-type/property-location-type.service';
import { StaticPropertyStatusService } from 'src/app/api-service/static-property-status/static-property-status.service';
import { StaticPropertyTypologyService } from 'src/app/api-service/static-property-typology/static-property-typology.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { Property } from 'src/app/models/property.model';
import { Static_AmenetieType } from 'src/app/models/static/static-amenetieType.model';
import { Static_PropertyConditionStatus } from 'src/app/models/static/static-propertyconditionstatus.model';
import { Static_PropertyLocationType } from 'src/app/models/static/static-propertylocationtype.model';
import { Static_PropertyStatus } from 'src/app/models/static/static-propertystatus.model';
import { Static_PropertyTypology } from 'src/app/models/static/static-propertytypology.model';
import { PropertyDashboardFilterStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard-filter.structure';
import { PropertyDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard-search-and-filter.structure';
import { PropertyDashboardStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard.structure';
import { SearchAndFilterStructure } from 'src/app/structures/dashboard-structures/search-and-filter.structure';
import { apiEndpoints, environment } from 'src/environments/environment';

@Component({
  selector: 'app-recommended-properties',
  templateUrl: './recommended-properties.component.html',
  styleUrls: ['./recommended-properties.component.css']
})
export class RecommendedPropertiesComponent implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  url: string = environment.apiUrl + apiEndpoints.image.binary;
  
  @Input() isEditable: boolean = false;
  @Input() recommendedProperties: Array<Property> = new Array<Property>();
  @Output() event_updateRecommendedProperties = new EventEmitter<Array<Property>>();

  isAddNewMode: boolean = false;

  propertyDashboardStructureArray: Array<PropertyDashboardStructure> = new Array<PropertyDashboardStructure>();
  propertyDashboardSearchAndFilterStructure: PropertyDashboardSearchAndFilterStructure = new PropertyDashboardSearchAndFilterStructure();
  next_searchAndFilterStructure: SearchAndFilterStructure = new SearchAndFilterStructure();

  propertyDashboardFilters: PropertyDashboardFilterStructure = new PropertyDashboardFilterStructure();
  statusFilterLabel: string = "Estado de venda";
  propertyLocationTypeFilterLabel: string = "Localização";
  typologyFilterLabel: string = "Tipologia";
  conditionStatusFilterLabel: string = "Estado";
  amenetieTypeFilterLabel: string = "Caraterísticas";

  hasPrevious: boolean = true;
  hasNext: boolean = true;
  
  isDataFetched: boolean = false;

  constructor(
    private lightboxService: LightboxService,
    public queries_propertyService: QueriesPropertyService, 
    public staticPropertyStatusService: StaticPropertyStatusService, 
    public staticPropertyLocationTypeService: StaticPropertyLocationTypeService, 
    public staticPropertyTypologyService: StaticPropertyTypologyService,
    public staticPropertyConditionStatusService: StaticPropertyConditionStatusService,
    public staticAmenetieTypeService: StaticAmenetieTypeService,
    public router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.get_propertyDashboardStructure();
    this.initFilterOptions();
  }

  onClick_selectMode(mode: boolean) {
    this.isAddNewMode = mode;
  }

  onClick_cancel() {
    this.isAddNewMode = false;
  }

  onClick_confirm() {
    this.isAddNewMode = false;
  }

  onClick_removeRecommended(index: number) {
    this.recommendedProperties.splice(index, 1);
    this.propertyDashboardStructureArray.forEach(element => {
      let isRecommendedProperty = this.recommendedProperties.filter(prop => prop.id == element.id).length != 0;
      element.isSelected = isRecommendedProperty;
    })
    this.triggerEvent_updateRecommendedProperties();
  }

  onClick_addRecommended(index: number) {
    let newRecommendedProperty: Property = new Property();
    newRecommendedProperty.id = this.propertyDashboardStructureArray[index].id;
    newRecommendedProperty.reference = this.propertyDashboardStructureArray[index].reference;
    newRecommendedProperty.propertyType.label = this.propertyDashboardStructureArray[index].propertyTypeLabel;
    newRecommendedProperty.propertyStatus.label = this.propertyDashboardStructureArray[index].propertyStatusLabel;
    newRecommendedProperty.propertyConditionStatus.label = this.propertyDashboardStructureArray[index].propertyConditionStatusLabel;
    newRecommendedProperty.propertyLocationType.label = this.propertyDashboardStructureArray[index].propertyLocationTypeLabel;
    newRecommendedProperty.mainImage.filename = this.propertyDashboardStructureArray[index].mainImageFilename;
    if (this.propertyDashboardStructureArray[index].isSelected) {
      this.recommendedProperties.push(newRecommendedProperty);
    } else {
      let indexToRemove = -1;
      for (let i = 0; i < this.recommendedProperties.length; i++) {
        
        if (this.recommendedProperties[i].id == this.propertyDashboardStructureArray[index].id) {
          indexToRemove = i;
        }
      }
      if (indexToRemove >= 0) {
        this.recommendedProperties.splice(indexToRemove, 1);
      }
    }
    this.triggerEvent_updateRecommendedProperties();
  }

  onClick_showMainImageLightbox(index: number) {
    const url = this.url + this.propertyDashboardStructureArray[index].mainImageFilename + "/true";
    this.lightboxService.open([{ src: url, caption: this.propertyDashboardStructureArray[index].reference }], 0);
  }

  triggerEvent_updateRecommendedProperties() {
    this.event_updateRecommendedProperties.emit(this.recommendedProperties);
  }

  onClick_selectStatusFilter(propertyStatusId: number, label: string) {
    this.propertyDashboardSearchAndFilterStructure.propertyStatusId = propertyStatusId;
    this.statusFilterLabel = label;
  }

  onClick_selectTypologyFilter(propertyTypologyId: number, label: string) {
    this.propertyDashboardSearchAndFilterStructure.propertyTypologyId = propertyTypologyId;
    this.typologyFilterLabel = label;
  }

  onClick_selectConditionStatusFilter(propertyConditionStatusId: number, label: string) {
    this.propertyDashboardSearchAndFilterStructure.propertyConditionStatusId = propertyConditionStatusId;
    this.conditionStatusFilterLabel = label;
  }

  onClick_selectAllTypes(event: MouseEvent) {
    event.stopPropagation();
    this.propertyDashboardFilters.amenetieTypes.forEach(element => {
      element.isSelected = true;
    })
  }

  onClick_clearTypes(event: MouseEvent) {
    event.stopPropagation();
    this.propertyDashboardFilters.amenetieTypes.forEach(element => {
      element.isSelected = false;
    })
  }

  onClick_selectAmenetieTypeFilter(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.propertyDashboardFilters.amenetieTypes[index].isSelected = !this.propertyDashboardFilters.amenetieTypes[index].isSelected;
  }

  onClick_selectPropertyLocationTypeFilter(locationTypeId: number, label: string) {
    this.propertyDashboardSearchAndFilterStructure.propertyLocationTypeId = locationTypeId;
    this.propertyLocationTypeFilterLabel = label;
  }

  onClick_confirmFilter() {
    this.propertyDashboardSearchAndFilterStructure.amenetieTypeIds = new Array<number>();
    this.propertyDashboardFilters.amenetieTypes.filter(prop => prop.isSelected).forEach(element => {
      this.propertyDashboardSearchAndFilterStructure.amenetieTypeIds.push(element.id);
    });
    this.get_propertyDashboardStructure();
  }

  onClick_clearFilter() {
    this.propertyDashboardSearchAndFilterStructure.propertyStatusId = 0;
    this.propertyDashboardSearchAndFilterStructure.propertyTypologyId = 0;
    this.propertyDashboardSearchAndFilterStructure.propertyConditionStatusId = 0;
    this.propertyDashboardSearchAndFilterStructure.amenetieTypeIds = new Array<number>();
    this.propertyDashboardSearchAndFilterStructure.propertyLocationTypeId = 0;
    this.statusFilterLabel = "Estado de venda";
    this.propertyLocationTypeFilterLabel = "Localização";
    this.typologyFilterLabel = "Tipologia";
    this.conditionStatusFilterLabel = "Estado";
    this.amenetieTypeFilterLabel = "Características";
    this.get_propertyDashboardStructure();
  }

  eventHandler_dashboardKpiClicked(clickedPropertyTypeId: number) {
    if (this.propertyDashboardSearchAndFilterStructure.propertyTypeId != clickedPropertyTypeId) {
      this.propertyDashboardSearchAndFilterStructure.propertyTypeId = clickedPropertyTypeId;
      this.get_propertyDashboardStructure();
    }
  }

  eventHandler_searchTextChanged(searchText: string) {
    this.propertyDashboardSearchAndFilterStructure.searchAndFilter.searchText = searchText;
    this.get_propertyDashboardStructure();
  }

  eventHandler_buttonClicked() {
    // ADD NAVIGATION TO NEW PROPERTY
    this.router.navigate(["/","Imovel"]);
  }

  get_propertyDashboardStructure() {
    this.isDataFetched = false;
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.queries_propertyService.Post_SearchAndFilter_PropertyStructure(this.propertyDashboardSearchAndFilterStructure, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.propertyDashboardStructureArray = <PropertyDashboardStructure[]>data;
        this.propertyDashboardStructureArray.forEach(element => {
          let isRecommendedProperty = this.recommendedProperties.filter(prop => prop.id == element.id).length != 0;
          if (isRecommendedProperty) {
            element.isSelected = true;
          }
        })
        this.isDataFetched = true;
        this.hasPreviousPage();
        this.hasNextPage();
      });
    });
  }

  previous() {
    if(this.hasPrevious) {
      this.propertyDashboardSearchAndFilterStructure.searchAndFilter.page -= 1;

      this.get_propertyDashboardStructure();
    }
  }

  next() {
    if(this.hasNext) {
      this.propertyDashboardSearchAndFilterStructure.searchAndFilter.page += 1;

      this.get_propertyDashboardStructure();
    }
  }

  private hasPreviousPage() {
    this.hasPrevious = this.propertyDashboardSearchAndFilterStructure.searchAndFilter.page > 0;
  }

  private hasNextPage() {
    this.hasNext = this.propertyDashboardStructureArray.length == this.propertyDashboardSearchAndFilterStructure.searchAndFilter.size;
  }

  private initFilterOptions() {
    this.getPropertyStatus();
    this.getPropertyLocationTypes();
    this.getPropertyTypologies();
    this.getPropertyConditionStatus();
    this.getAmenetieTypes();
  }

  private getPropertyStatus() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.staticPropertyStatusService.GetAll_PropertyStatuses(true, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.propertyDashboardFilters.statuses = <Static_PropertyStatus[]>data;
      });
    });
  }

  private getPropertyLocationTypes() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.staticPropertyLocationTypeService.GetAll_PropertyLocationTypes(true, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.propertyDashboardFilters.locationTypes = <Static_PropertyLocationType[]>data;
      });
    });
  }

  private getPropertyTypologies() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.staticPropertyTypologyService.GetAll_PropertyTypology(true, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.propertyDashboardFilters.tipologies = <Static_PropertyTypology[]>data;
      });
    });
  }

  private getPropertyConditionStatus() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.staticPropertyConditionStatusService.GetAll_PropertyConditionStatuses(true, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.propertyDashboardFilters.conditionStatuses = <Static_PropertyConditionStatus[]>data;
      });
    });
  }

  private getAmenetieTypes() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.staticAmenetieTypeService.GetAll_AmenetieTypes(true, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.propertyDashboardFilters.amenetieTypes = <Static_AmenetieType[]>data;
      });
    });
  }

}
