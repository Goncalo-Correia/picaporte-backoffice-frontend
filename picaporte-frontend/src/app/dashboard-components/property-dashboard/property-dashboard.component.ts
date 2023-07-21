import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { QueriesPropertyService } from 'src/app/api-service/queries-property/queries-property.service';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { PropertyDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard-search-and-filter.structure';
import { PropertyDashboardStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard.structure';
import { SearchAndFilterStructure } from 'src/app/structures/dashboard-structures/search-and-filter.structure';
import { PropertyDashboardFilterStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard-filter.structure';
import { StaticPropertyStatusService } from 'src/app/api-service/static-property-status/static-property-status.service';
import { StaticPropertyTypologyService } from 'src/app/api-service/static-property-typology/static-property-typology.service';
import { StaticPropertyConditionStatusService } from 'src/app/api-service/static-property-condition-status/property-condition-status.service';
import { Static_PropertyStatus } from 'src/app/models/static/static-propertystatus.model';
import { Static_PropertyTypology } from 'src/app/models/static/static-propertytypology.model';
import { Static_PropertyConditionStatus } from 'src/app/models/static/static-propertyconditionstatus.model';
import { StaticAmenetieTypeService } from 'src/app/api-service/static-amenetie-type/static-amenetie-type-service.service';
import { Static_AmenetieType } from 'src/app/models/static/static-amenetieType.model';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { catchError } from 'rxjs';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { StaticPropertyLocationTypeService } from 'src/app/api-service/static-property-location-type/property-location-type.service';
import { Static_PropertyLocationType } from 'src/app/models/static/static-propertylocationtype.model';
import { ExportStructure } from 'src/app/structures/export-structure';
import { QueriesExportService } from 'src/app/api-service/queries-export/queries-export.service';
import { DOCUMENT } from '@angular/common';
import { StaticIslandService } from 'src/app/api-service/static_island/static-island.service';
import { Static_Island } from 'src/app/models/static/static-island.model';

@Component({
  selector: 'app-property-dashboard',
  templateUrl: './property-dashboard.component.html',
  styleUrls: ['./property-dashboard.component.css']
})
export class PropertyDashboardComponent implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  dashboardKpis: Array<DashboardKpiStructure>;
  placeholderDashboardKpi: DashboardKpiStructure;

  propertyDashboardStructureArray: PropertyDashboardStructure[];
  propertyDashboardSearchAndFilterStructure: PropertyDashboardSearchAndFilterStructure;
  next_searchAndFilterStructure: SearchAndFilterStructure;

  propertyDashboardFilters: PropertyDashboardFilterStructure;
  statusFilterLabel: string = "Estado de venda";
  propertyLocationTypeFilterLabel: string = "Localização";
  typologyFilterLabel: string = "Tipologia";
  conditionStatusFilterLabel: string = "Estado";
  amenetieTypeFilterLabel: string = "Caraterísticas";
  islandFilterLabel: string = "Ilha";

  hasPrevious: boolean = true;
  hasNext: boolean = true;
  
  isDataFetched: boolean = false;
  isKpiDataFetched: boolean = false;

  exportStructure: ExportStructure = new ExportStructure();

  constructor(
    public queries_propertyService: QueriesPropertyService, 
    private queries_export: QueriesExportService,
    public staticPropertyStatusService: StaticPropertyStatusService, 
    public staticPropertyLocationTypeService: StaticPropertyLocationTypeService, 
    public staticPropertyTypologyService: StaticPropertyTypologyService,
    public staticPropertyConditionStatusService: StaticPropertyConditionStatusService,
    public staticAmenetieTypeService: StaticAmenetieTypeService,
    public router: Router,
    private authenticationService: AuthenticationService,
    private staticIslandService: StaticIslandService,
    @Inject(DOCUMENT) private document: Document
    ) {
    this.dashboardKpis = new Array<DashboardKpiStructure>();
    this.placeholderDashboardKpi = new DashboardKpiStructure();
    this.propertyDashboardFilters = new PropertyDashboardFilterStructure();
    this.propertyDashboardStructureArray = new Array<PropertyDashboardStructure>();
    this.propertyDashboardSearchAndFilterStructure = new PropertyDashboardSearchAndFilterStructure();
    this.next_searchAndFilterStructure = new SearchAndFilterStructure();
  }

  ngOnInit(): void {
    this.get_Kpis();
    this.get_propertyDashboardStructure();
    this.initFilterOptions();
  }

  onClick_selectIslandFilter(islandId: number, label: string) {
    this.propertyDashboardSearchAndFilterStructure.islandId = islandId;
    this.islandFilterLabel = label;
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
    this.propertyDashboardSearchAndFilterStructure.isOnline = false;
    this.propertyDashboardSearchAndFilterStructure.islandId = 0;
    this.statusFilterLabel = "Estado de venda";
    this.propertyLocationTypeFilterLabel = "Localização";
    this.typologyFilterLabel = "Tipologia";
    this.conditionStatusFilterLabel = "Estado";
    this.amenetieTypeFilterLabel = "Características";
    this.islandFilterLabel = "Ilha";
    this.get_propertyDashboardStructure();
  }

  onClick_export() {
    this.get_export();
  }

  onClick_copy() {
    const textToCopy = this.document.getElementById('exportDiv')?.innerText;
    if (textToCopy != null) {
      navigator.clipboard.writeText(textToCopy).then(function() {
        console.log('Copying to clipboard was successful!');
      }, function(err) {
        console.error('Could not copy text: ', err);
      });
    }
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
        this.isDataFetched = true;
        this.hasPreviousPage();
        this.hasNextPage();
      });
    });
  }

  get_export() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.queries_export.ExportProperty(this.propertyDashboardSearchAndFilterStructure, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.exportStructure = <ExportStructure>data;
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

  private get_Kpis() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.queries_propertyService.Get_Kpis(resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.dashboardKpis = <DashboardKpiStructure[]>data;
        this.isKpiDataFetched = true;
      });
    });
  }

  private initFilterOptions() {
    this.getPropertyStatus();
    this.getPropertyLocationTypes();
    this.getPropertyTypologies();
    this.getPropertyConditionStatus();
    this.getAmenetieTypes();
    this.getIslands();
  }

  private getIslands() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.staticIslandService.GetAll_Islands(resolve)
      .subscribe(data => {
        this.propertyDashboardFilters.islands = <Static_Island[]>data;
      });
    });
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
