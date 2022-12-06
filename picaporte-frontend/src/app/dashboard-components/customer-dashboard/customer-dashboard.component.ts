import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QueriesCustomerService } from 'src/app/api-service/queries-customer/queries-customer.service';
import { CustomerDashboardFilterStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard-filters.structure';
import { CustomerDashboardStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard.structure';
import { CustomerDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard-search-and-filter.structure';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { catchError } from 'rxjs';
import { MessageComponent } from 'src/app/generic-components/message/message.component';

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
  amenetieTypeFilterLabel: string = "Caraterísticas";

  isDataFetched: boolean = false;
  isKpiDataFetched: boolean = false;

  constructor(
    public queries_customerService: QueriesCustomerService,
    public router: Router,
    private authenticationService: AuthenticationService
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
  }

  onClick_selectAmenetieTypeFilter(amenetieTypeId: number, label: string) {
    this.customerSearchAndFilterStructure.amenetieTypeId = amenetieTypeId;
    this.amenetieTypeFilterLabel = label;
  }

  onClick_confirmFilter() {
    this.get_customerDashboardStructure();
  }

  onClick_clearFilter() {
    this.customerSearchAndFilterStructure.amenetieTypeId = 0;
    this.amenetieTypeFilterLabel = "Características";
    this.get_customerDashboardStructure();
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
      this.queries_customerService.Post_SearchAndFilter_CustomerStructure(this.customerSearchAndFilterStructure.searchAndFilterStructure, resolve)
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
