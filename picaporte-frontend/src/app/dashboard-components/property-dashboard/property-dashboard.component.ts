import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QueriesExportService } from 'src/app/api-service/queries-export/queries-export.service';
import { QueriesPropertyService } from 'src/app/api-service/queries-property/queries-property.service';
import { StaticAmenetieTypeService } from 'src/app/api-service/static-amenetie-type/static-amenetie-type-service.service';
import { StaticPropertyConditionStatusService } from 'src/app/api-service/static-property-condition-status/property-condition-status.service';
import { StaticIslandService } from 'src/app/api-service/static_island/static-island.service';
import { StaticPropertyLocationTypeService } from 'src/app/api-service/static-property-location-type/property-location-type.service';
import { StaticPropertyStatusService } from 'src/app/api-service/static-property-status/static-property-status.service';
import { StaticPropertyTypologyService } from 'src/app/api-service/static-property-typology/static-property-typology.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { BaseDashboardComponent } from 'src/app/dashboard-components/shared/base-dashboard.component';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { Static_AmenetieType } from 'src/app/models/static/static-amenetieType.model';
import { Static_Island } from 'src/app/models/static/static-island.model';
import { Static_PropertyConditionStatus } from 'src/app/models/static/static-propertyconditionstatus.model';
import { Static_PropertyLocationType } from 'src/app/models/static/static-propertylocationtype.model';
import { Static_PropertyStatus } from 'src/app/models/static/static-propertystatus.model';
import { Static_PropertyTypology } from 'src/app/models/static/static-propertytypology.model';
import { ExportStructure } from 'src/app/structures/export-structure';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { PropertyDashboardFilterStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard-filter.structure';
import { PropertyDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard-search-and-filter.structure';
import { PropertyDashboardStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard.structure';

@Component({
  selector: 'app-property-dashboard',
  templateUrl: './property-dashboard.component.html',
  styleUrls: ['./property-dashboard.component.css']
})
export class PropertyDashboardComponent extends BaseDashboardComponent implements OnInit {

  @ViewChild(MessageComponent) override messageComponent!: MessageComponent;

  dashboardKpis: DashboardKpiStructure[] = [];
  placeholderDashboardKpi: DashboardKpiStructure = new DashboardKpiStructure();

  propertyDashboardStructureArray: PropertyDashboardStructure[] = [];
  propertyDashboardSearchAndFilterStructure: PropertyDashboardSearchAndFilterStructure = new PropertyDashboardSearchAndFilterStructure();

  propertyDashboardFilters: PropertyDashboardFilterStructure = new PropertyDashboardFilterStructure();
  statusFilterLabel: string = 'Estado de venda';
  propertyLocationTypeFilterLabel: string = 'Localiza\u00E7\u00E3o';
  typologyFilterLabel: string = 'Tipologia';
  conditionStatusFilterLabel: string = 'Estado';
  amenetieTypeFilterLabel: string = 'Carater\u00EDsticas';
  islandFilterLabel: string = 'Ilha';

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
    authenticationService: AuthenticationService,
    private staticIslandService: StaticIslandService,
    @Inject(DOCUMENT) private document: Document
  ) {
    super(authenticationService);
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
    this.propertyDashboardFilters.amenetieTypes.forEach((element) => {
      element.isSelected = true;
    });
  }

  onClick_clearTypes(event: MouseEvent) {
    event.stopPropagation();
    this.propertyDashboardFilters.amenetieTypes.forEach((element) => {
      element.isSelected = false;
    });
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
    this.propertyDashboardSearchAndFilterStructure.amenetieTypeIds = this.propertyDashboardFilters.amenetieTypes
      .filter((element) => element.isSelected)
      .map((element) => element.id);
    this.resetToFirstPage(this.propertyDashboardSearchAndFilterStructure.searchAndFilter);
    this.get_propertyDashboardStructure();
  }

  onClick_clearFilter() {
    this.propertyDashboardSearchAndFilterStructure.propertyStatusId = 0;
    this.propertyDashboardSearchAndFilterStructure.propertyTypologyId = 0;
    this.propertyDashboardSearchAndFilterStructure.propertyConditionStatusId = 0;
    this.propertyDashboardSearchAndFilterStructure.amenetieTypeIds = [];
    this.propertyDashboardSearchAndFilterStructure.propertyLocationTypeId = 0;
    this.propertyDashboardSearchAndFilterStructure.isOnline = false;
    this.propertyDashboardSearchAndFilterStructure.islandId = 0;
    this.statusFilterLabel = 'Estado de venda';
    this.propertyLocationTypeFilterLabel = 'Localiza\u00E7\u00E3o';
    this.typologyFilterLabel = 'Tipologia';
    this.conditionStatusFilterLabel = 'Estado';
    this.amenetieTypeFilterLabel = 'Caracter\u00EDsticas';
    this.islandFilterLabel = 'Ilha';
    this.propertyDashboardFilters.amenetieTypes.forEach((element) => {
      element.isSelected = false;
    });
    this.resetToFirstPage(this.propertyDashboardSearchAndFilterStructure.searchAndFilter);
    this.get_propertyDashboardStructure();
  }

  onClick_export() {
    this.get_export();
  }

  onClick_copy() {
    this.copyElementText(this.document, 'exportDiv');
  }

  eventHandler_dashboardKpiClicked(clickedPropertyTypeId: number) {
    if (this.propertyDashboardSearchAndFilterStructure.propertyTypeId != clickedPropertyTypeId) {
      this.propertyDashboardSearchAndFilterStructure.propertyTypeId = clickedPropertyTypeId;
    } else {
      this.propertyDashboardSearchAndFilterStructure.propertyTypeId = 0;
    }

    this.resetToFirstPage(this.propertyDashboardSearchAndFilterStructure.searchAndFilter);
    this.get_propertyDashboardStructure();
  }

  eventHandler_searchTextChanged(searchText: string) {
    this.propertyDashboardSearchAndFilterStructure.searchAndFilter.searchText = searchText;
    this.resetToFirstPage(this.propertyDashboardSearchAndFilterStructure.searchAndFilter);
    this.get_propertyDashboardStructure();
  }

  eventHandler_buttonClicked() {
    this.router.navigate(['/', 'Imovel']);
  }

  get_propertyDashboardStructure() {
    this.isDataFetched = false;
    this.runAuthenticatedRequest(
      (httpOptions) => this.queries_propertyService.Post_SearchAndFilter_PropertyStructure(this.propertyDashboardSearchAndFilterStructure, httpOptions),
      (data) => {
        this.propertyDashboardStructureArray = data as PropertyDashboardStructure[];
        this.isDataFetched = true;
        this.updatePaginationFlags();
      },
      () => {
        this.propertyDashboardStructureArray = [];
        this.isDataFetched = true;
        this.updatePaginationFlags();
      }
    );
  }

  get_export() {
    this.runAuthenticatedRequest(
      (httpOptions) => this.queries_export.ExportProperty(this.propertyDashboardSearchAndFilterStructure, httpOptions),
      (data) => {
        this.exportStructure = data as ExportStructure;
      }
    );
  }

  previous() {
    if (this.hasPrevious) {
      this.propertyDashboardSearchAndFilterStructure.searchAndFilter.page -= 1;
      this.get_propertyDashboardStructure();
    }
  }

  next() {
    if (this.hasNext) {
      this.propertyDashboardSearchAndFilterStructure.searchAndFilter.page += 1;
      this.get_propertyDashboardStructure();
    }
  }

  private updatePaginationFlags() {
    const pagination = this.updatePagination(
      this.propertyDashboardSearchAndFilterStructure.searchAndFilter,
      this.propertyDashboardStructureArray.length
    );
    this.hasPrevious = pagination.hasPrevious;
    this.hasNext = pagination.hasNext;
  }

  private get_Kpis() {
    this.runAuthenticatedRequest(
      (httpOptions) => this.queries_propertyService.Get_Kpis(httpOptions),
      (data) => {
        this.dashboardKpis = data as DashboardKpiStructure[];
        this.isKpiDataFetched = true;
      },
      () => {
        this.dashboardKpis = [];
        this.isKpiDataFetched = true;
      }
    );
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
    this.runAuthenticatedRequest(
      (httpOptions) => this.staticIslandService.GetAll_Islands(httpOptions),
      (data) => {
        this.propertyDashboardFilters.islands = data as Static_Island[];
      }
    );
  }

  private getPropertyStatus() {
    this.runAuthenticatedRequest(
      (httpOptions) => this.staticPropertyStatusService.GetAll_PropertyStatuses(true, httpOptions),
      (data) => {
        this.propertyDashboardFilters.statuses = data as Static_PropertyStatus[];
      }
    );
  }

  private getPropertyLocationTypes() {
    this.runAuthenticatedRequest(
      (httpOptions) => this.staticPropertyLocationTypeService.GetAll_PropertyLocationTypes(true, httpOptions),
      (data) => {
        this.propertyDashboardFilters.locationTypes = data as Static_PropertyLocationType[];
      }
    );
  }

  private getPropertyTypologies() {
    this.runAuthenticatedRequest(
      (httpOptions) => this.staticPropertyTypologyService.GetAll_PropertyTypology(true, httpOptions),
      (data) => {
        this.propertyDashboardFilters.tipologies = data as Static_PropertyTypology[];
      }
    );
  }

  private getPropertyConditionStatus() {
    this.runAuthenticatedRequest(
      (httpOptions) => this.staticPropertyConditionStatusService.GetAll_PropertyConditionStatuses(true, httpOptions),
      (data) => {
        this.propertyDashboardFilters.conditionStatuses = data as Static_PropertyConditionStatus[];
      }
    );
  }

  private getAmenetieTypes() {
    this.runAuthenticatedRequest(
      (httpOptions) => this.staticAmenetieTypeService.GetAll_AmenetieTypes(true, httpOptions),
      (data) => {
        this.propertyDashboardFilters.amenetieTypes = data as Static_AmenetieType[];
      }
    );
  }
}
