import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QueriesCustomerService } from 'src/app/api-service/queries-customer/queries-customer.service';
import { CustomerDashboardStructure } from 'src/app/structures/customer-dashboard.structure';
import { SearchAndFilterStructure } from 'src/app/structures/search-and-filter.structure';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  customerDashboardStructureArray: CustomerDashboardStructure[];
  searchAndFilterStructure: SearchAndFilterStructure;
  next_searchAndFilterStructure: SearchAndFilterStructure;
  isDataFetched: boolean = false;
  hasPrevious: boolean = true;
  hasNext: boolean = true;

  constructor(public queries_customerService: QueriesCustomerService) {
    this.customerDashboardStructureArray = new Array<CustomerDashboardStructure>();
    this.searchAndFilterStructure = new SearchAndFilterStructure();
    this.next_searchAndFilterStructure = new SearchAndFilterStructure();
  }

  ngOnInit(): void {
    this.get_customerDashboardStructure();
  }

  get_customerDashboardStructure() {
    this.queries_customerService.Post_SearchAndFilter_CustomerStructure(this.searchAndFilterStructure).subscribe((data: {}) => {
      this.customerDashboardStructureArray = <CustomerDashboardStructure[]>data;
      this.isDataFetched = true;
      this.hasPreviousPage();
      this.hasNextPage();
    });
    
  }

  previous() {
    if(this.hasPrevious) {
      this.searchAndFilterStructure.page -= 1;

      this.get_customerDashboardStructure();
    }
  }

  next() {
    if(this.hasNext) {
      this.searchAndFilterStructure.page += 1;

      this.get_customerDashboardStructure();
    }
  }

  private hasPreviousPage() {
    this.hasPrevious = this.searchAndFilterStructure.page > 0;
  }

  private hasNextPage() {
    this.hasNext = this.customerDashboardStructureArray.length == this.searchAndFilterStructure.size;
  }

}
