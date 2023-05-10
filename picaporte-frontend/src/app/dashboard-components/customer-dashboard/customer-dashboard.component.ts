import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QueriesCustomerService } from 'src/app/api-service/queries-customer/queries-customer.service';
import { CustomerDashboardFilterStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard-filters.structure';
import { CustomerDashboardStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard.structure';
import { CustomerDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard-search-and-filter.structure';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { catchError } from 'rxjs';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { StaticAmenetieTypeService } from 'src/app/api-service/static-amenetie-type/static-amenetie-type-service.service';
import { Static_AmenetieType } from 'src/app/models/static/static-amenetieType.model';
import { DOCUMENT } from '@angular/common';
import { QueriesExportService } from 'src/app/api-service/queries-export/queries-export.service';
import { ExportStructure } from 'src/app/structures/export-structure';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  dashboardKpis: Array<DashboardKpiStructure>;
  placeholderDashboardKpi: DashboardKpiStructure;

  customerDashboardStructureArray: CustomerDashboardStructure[];
  customerSearchAndFilterStructure: CustomerDashboardSearchAndFilterStructure;
  hasPrevious: boolean = true;
  hasNext: boolean = true;

  customerDashboardFilters: CustomerDashboardFilterStructure;

  isDataFetched: boolean = false;
  isKpiDataFetched: boolean = false;

  exportStructure: ExportStructure = new ExportStructure();

  constructor(
    public queries_customerService: QueriesCustomerService,
    private queries_export: QueriesExportService,
    public router: Router,
    private authenticationService: AuthenticationService,
    private staticAmenetieTypeService: StaticAmenetieTypeService,
    @Inject(DOCUMENT) private document: Document
    ) {
    this.dashboardKpis = new Array<DashboardKpiStructure>();
    this.placeholderDashboardKpi = new DashboardKpiStructure();
    this.customerDashboardStructureArray = new Array<CustomerDashboardStructure>();
    this.customerSearchAndFilterStructure = new CustomerDashboardSearchAndFilterStructure();
    this.customerDashboardFilters = new CustomerDashboardFilterStructure();
  }

  ngOnInit(): void {
    this.get_Kpis();
    this.get_customerDashboardStructure();
    this.getFilters();
  }

  onClick_selectAllTypes(event: MouseEvent) {
    event.stopPropagation();
    this.customerDashboardFilters.amenetieTypes.forEach(element => {
      element.isSelected = true;
    })
  }

  onClick_clearTypes(event: MouseEvent) {
    event.stopPropagation();
    this.customerDashboardFilters.amenetieTypes.forEach(element => {
      element.isSelected = false;
    })
  }

  onClick_selectAmenetieTypeFilter(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.customerDashboardFilters.amenetieTypes[index].isSelected = !this.customerDashboardFilters.amenetieTypes[index].isSelected;
  }

  onClick_confirmFilter() {
    this.customerSearchAndFilterStructure.amenetieTypeIds = new Array<number>();
    this.customerDashboardFilters.amenetieTypes.filter(prop => prop.isSelected).forEach(element => {
      this.customerSearchAndFilterStructure.amenetieTypeIds.push(element.id);
    });
    this.get_customerDashboardStructure();
  }

  onClick_clearFilter() {
    this.customerSearchAndFilterStructure.amenetieTypeIds = new Array<number>();
    this.customerDashboardFilters.amenetieTypes.forEach(element => {
      element.isSelected = false;
    })
    this.get_customerDashboardStructure();
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

  eventHandler_dashboardKpiClicked(index: number) {
    if (index == 0 && this.customerSearchAndFilterStructure.customersWithUser) {
      this.customerSearchAndFilterStructure.customersWithUser = false;
      this.get_customerDashboardStructure();
    } 
    if (index == 1 && !this.customerSearchAndFilterStructure.customersWithUser) {
      this.customerSearchAndFilterStructure.customersWithUser = true;
      this.get_customerDashboardStructure();
    }
  }

  eventHandler_searchTextChanged(searchText: string) {
    this.customerSearchAndFilterStructure.searchAndFilterStructure.searchText = searchText;
    this.get_customerDashboardStructure();
  }

  eventHandler_buttonClicked() {
    // ADD NAVIGATION TO NEW PROPERTY
    this.router.navigate(["/","Cliente"]);
  }

  get_customerDashboardStructure() {
    this.isDataFetched = false;
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.queries_customerService.Post_SearchAndFilter_CustomerStructure(this.customerSearchAndFilterStructure, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.customerDashboardStructureArray = <CustomerDashboardStructure[]>data;
        this.isDataFetched = true;
        this.hasPreviousPage();
        this.hasNextPage();
      });
    });
  }

  get_export() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.queries_export.ExportCustomer(this.customerSearchAndFilterStructure, resolve)
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
      this.customerSearchAndFilterStructure.searchAndFilterStructure.page -= 1;

      this.get_customerDashboardStructure();
    }
  }

  next() {
    if(this.hasNext) {
      this.customerSearchAndFilterStructure.searchAndFilterStructure.page += 1;

      this.get_customerDashboardStructure();
    }
  }

  private getFilters() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.staticAmenetieTypeService.GetAll_AmenetieTypes(true, resolve)
      .pipe(
        catchError(err => {
          this.messageComponent.showMessage(err.error);
          return err;
        })
      )
      .subscribe(data => {
        this.customerDashboardFilters.amenetieTypes = <Static_AmenetieType[]>data;
        this.isDataFetched = true;
        this.hasPreviousPage();
        this.hasNextPage();
      });
    });
  }

  private hasPreviousPage() {
    this.hasPrevious = this.customerSearchAndFilterStructure.searchAndFilterStructure.page > 0;
  }

  private hasNextPage() {
    this.hasNext = this.customerDashboardStructureArray.length == this.customerSearchAndFilterStructure.searchAndFilterStructure.size;
  }

  private get_Kpis() {
    this.authenticationService.refreshHttpOptions().then((resolve:any) => { 
      this.queries_customerService.Get_Kpis(resolve)
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
}
