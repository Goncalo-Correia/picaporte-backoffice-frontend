import { Component, OnInit, ViewChild } from '@angular/core';
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
  typologyFilterLabel: string = "Tipologia";
  conditionStatusFilterLabel: string = "Estado";
  amenetieTypeFilterLabel: string = "Caraterísticas";

  hasPrevious: boolean = true;
  hasNext: boolean = true;
  
  isDataFetched: boolean = false;
  isKpiDataFetched: boolean = false;

  constructor(
    public queries_propertyService: QueriesPropertyService, 
    public staticPropertyStatusService: StaticPropertyStatusService, 
    public staticPropertyTypologyService: StaticPropertyTypologyService,
    public staticPropertyConditionStatusService: StaticPropertyConditionStatusService,
    public staticAmenetieTypeService: StaticAmenetieTypeService,
    public router: Router,
    private authenticationService: AuthenticationService
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

  onClick_selectAmenetieTypeFilter(amenetieTypeId: number, label: string) {
    this.propertyDashboardSearchAndFilterStructure.amenetieTypeId = amenetieTypeId;
    this.amenetieTypeFilterLabel = label;
  }

  onClick_confirmFilter() {
    this.get_propertyDashboardStructure();
  }

  onClick_clearFilter() {
    this.propertyDashboardSearchAndFilterStructure.propertyStatusId = 0;
    this.propertyDashboardSearchAndFilterStructure.propertyTypologyId = 0;
    this.propertyDashboardSearchAndFilterStructure.propertyConditionStatusId = 0;
    this.propertyDashboardSearchAndFilterStructure.amenetieTypeId = 0;
    this.statusFilterLabel = "Estado de venda";
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
    this.propertyDashboardSearchAndFilterStructure.searchAndFilterStructure.searchText = searchText;
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

  previous() {
    if(this.hasPrevious) {
      this.propertyDashboardSearchAndFilterStructure.searchAndFilterStructure.page -= 1;

      this.get_propertyDashboardStructure();
    }
  }

  next() {
    if(this.hasNext) {
      this.propertyDashboardSearchAndFilterStructure.searchAndFilterStructure.page += 1;

      this.get_propertyDashboardStructure();
    }
  }

  private hasPreviousPage() {
    this.hasPrevious = this.propertyDashboardSearchAndFilterStructure.searchAndFilterStructure.page > 0;
  }

  private hasNextPage() {
    this.hasNext = this.propertyDashboardStructureArray.length == this.propertyDashboardSearchAndFilterStructure.searchAndFilterStructure.size;
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
