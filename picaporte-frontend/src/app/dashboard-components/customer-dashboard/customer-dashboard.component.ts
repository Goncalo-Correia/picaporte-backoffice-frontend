import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QueriesCustomerService } from 'src/app/api-service/queries-customer/queries-customer.service';
import { QueriesExportService } from 'src/app/api-service/queries-export/queries-export.service';
import { StaticAmenetieTypeService } from 'src/app/api-service/static-amenetie-type/static-amenetie-type-service.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { BaseDashboardComponent } from 'src/app/dashboard-components/shared/base-dashboard.component';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { Static_AmenetieType } from 'src/app/models/static/static-amenetieType.model';
import { ExportStructure } from 'src/app/structures/export-structure';
import { CustomerDashboardFilterStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard-filters.structure';
import { CustomerDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard-search-and-filter.structure';
import { CustomerDashboardStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard.structure';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent extends BaseDashboardComponent implements OnInit {

  @ViewChild(MessageComponent) override messageComponent!: MessageComponent;

  dashboardKpis: DashboardKpiStructure[] = [];
  placeholderDashboardKpi: DashboardKpiStructure = new DashboardKpiStructure();

  customerDashboardStructureArray: CustomerDashboardStructure[] = [];
  customerSearchAndFilterStructure: CustomerDashboardSearchAndFilterStructure = new CustomerDashboardSearchAndFilterStructure();
  hasPrevious: boolean = true;
  hasNext: boolean = true;

  customerDashboardFilters: CustomerDashboardFilterStructure = new CustomerDashboardFilterStructure();

  isDataFetched: boolean = false;
  isKpiDataFetched: boolean = false;

  exportStructure: ExportStructure = new ExportStructure();

  constructor(
    public queries_customerService: QueriesCustomerService,
    private queries_export: QueriesExportService,
    public router: Router,
    authenticationService: AuthenticationService,
    private staticAmenetieTypeService: StaticAmenetieTypeService,
    @Inject(DOCUMENT) private document: Document
  ) {
    super(authenticationService);
  }

  ngOnInit(): void {
    this.get_Kpis();
    this.get_customerDashboardStructure();
    this.getFilters();
  }

  onClick_selectAllTypes(event: MouseEvent) {
    event.stopPropagation();
    this.customerDashboardFilters.amenetieTypes.forEach((element) => {
      element.isSelected = true;
    });
  }

  onClick_clearTypes(event: MouseEvent) {
    event.stopPropagation();
    this.customerDashboardFilters.amenetieTypes.forEach((element) => {
      element.isSelected = false;
    });
  }

  onClick_selectAmenetieTypeFilter(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.customerDashboardFilters.amenetieTypes[index].isSelected = !this.customerDashboardFilters.amenetieTypes[index].isSelected;
  }

  onClick_confirmFilter() {
    this.customerSearchAndFilterStructure.amenetieTypeIds = this.customerDashboardFilters.amenetieTypes
      .filter((element) => element.isSelected)
      .map((element) => element.id);
    this.resetToFirstPage(this.customerSearchAndFilterStructure.searchAndFilterStructure);
    this.get_customerDashboardStructure();
  }

  onClick_clearFilter() {
    this.customerSearchAndFilterStructure.amenetieTypeIds = [];
    this.customerDashboardFilters.amenetieTypes.forEach((element) => {
      element.isSelected = false;
    });
    this.resetToFirstPage(this.customerSearchAndFilterStructure.searchAndFilterStructure);
    this.get_customerDashboardStructure();
  }

  onClick_export() {
    this.get_export();
  }

  onClick_copy() {
    this.copyElementText(this.document, 'exportDiv');
  }

  eventHandler_dashboardKpiClicked(index: number) {
    let didChange = false;

    if (index === 0 && this.customerSearchAndFilterStructure.customersWithUser) {
      this.customerSearchAndFilterStructure.customersWithUser = false;
      didChange = true;
    }

    if (index === 1 && !this.customerSearchAndFilterStructure.customersWithUser) {
      this.customerSearchAndFilterStructure.customersWithUser = true;
      didChange = true;
    }

    if (didChange) {
      this.resetToFirstPage(this.customerSearchAndFilterStructure.searchAndFilterStructure);
      this.get_customerDashboardStructure();
    }
  }

  eventHandler_searchTextChanged(searchText: string) {
    this.customerSearchAndFilterStructure.searchAndFilterStructure.searchText = searchText;
    this.resetToFirstPage(this.customerSearchAndFilterStructure.searchAndFilterStructure);
    this.get_customerDashboardStructure();
  }

  eventHandler_buttonClicked() {
    this.router.navigate(['/', 'Cliente']);
  }

  get_customerDashboardStructure() {
    this.isDataFetched = false;
    this.runAuthenticatedRequest(
      (httpOptions) => this.queries_customerService.Post_SearchAndFilter_CustomerStructure(this.customerSearchAndFilterStructure, httpOptions),
      (data) => {
        this.customerDashboardStructureArray = data as CustomerDashboardStructure[];
        this.isDataFetched = true;
        this.updatePaginationFlags();
      },
      () => {
        this.customerDashboardStructureArray = [];
        this.isDataFetched = true;
        this.updatePaginationFlags();
      }
    );
  }

  get_export() {
    this.runAuthenticatedRequest(
      (httpOptions) => this.queries_export.ExportCustomer(this.customerSearchAndFilterStructure, httpOptions),
      (data) => {
        this.exportStructure = data as ExportStructure;
      }
    );
  }

  previous() {
    if (this.hasPrevious) {
      this.customerSearchAndFilterStructure.searchAndFilterStructure.page -= 1;
      this.get_customerDashboardStructure();
    }
  }

  next() {
    if (this.hasNext) {
      this.customerSearchAndFilterStructure.searchAndFilterStructure.page += 1;
      this.get_customerDashboardStructure();
    }
  }

  private getFilters() {
    this.runAuthenticatedRequest(
      (httpOptions) => this.staticAmenetieTypeService.GetAll_AmenetieTypes(true, httpOptions),
      (data) => {
        this.customerDashboardFilters.amenetieTypes = data as Static_AmenetieType[];
      }
    );
  }

  private updatePaginationFlags() {
    const pagination = this.updatePagination(
      this.customerSearchAndFilterStructure.searchAndFilterStructure,
      this.customerDashboardStructureArray.length
    );
    this.hasPrevious = pagination.hasPrevious;
    this.hasNext = pagination.hasNext;
  }

  private get_Kpis() {
    this.runAuthenticatedRequest(
      (httpOptions) => this.queries_customerService.Get_Kpis(httpOptions),
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
}
