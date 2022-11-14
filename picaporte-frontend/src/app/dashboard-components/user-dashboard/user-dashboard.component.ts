import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueriesUserService } from 'src/app/api-service/queries-user/queries-user.service';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { UserDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/user/user-dashboard-search-and-filter.structure';
import { UserDashboardStructure } from 'src/app/structures/dashboard-structures/user/user-dashboard.structure';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit {

  dashboardKpis: Array<DashboardKpiStructure>;
  placeholderDashboardKpi: DashboardKpiStructure;

  userDashboardStructureArray: Array<UserDashboardStructure>;
  userSearchAndFilterStructure: UserDashboardSearchAndFilterStructure;
  hasPrevious: boolean = true;
  hasNext: boolean = true;

  isDataFetched: boolean = false;
  isKpiDataFetched: boolean = false;

  constructor(public queries_userService: QueriesUserService, public router: Router) { 
    this.dashboardKpis = new Array<DashboardKpiStructure>();
    this.placeholderDashboardKpi = new DashboardKpiStructure();
    this.userDashboardStructureArray = new Array<UserDashboardStructure>();
    this.userSearchAndFilterStructure = new UserDashboardSearchAndFilterStructure();
  }

  ngOnInit(): void {
    this.get_Kpis();
    this.get_userDashboardStructure();
  }

  eventHandler_dashboardKpiClicked(index: number) {
    if (index == 0 && this.userSearchAndFilterStructure.hasAdminFilter) {
      this.userSearchAndFilterStructure.isAdmin = false;
      this.userSearchAndFilterStructure.hasAdminFilter = false;
      this.get_userDashboardStructure();
    }
    if (index == 1 && ((this.userSearchAndFilterStructure.isAdmin && this.userSearchAndFilterStructure.hasAdminFilter) || (!this.userSearchAndFilterStructure.hasAdminFilter))) {
      this.userSearchAndFilterStructure.isAdmin = false;
      this.userSearchAndFilterStructure.hasAdminFilter = true;
      this.get_userDashboardStructure();
    } 
    if (index == 2 && ((!this.userSearchAndFilterStructure.isAdmin && this.userSearchAndFilterStructure.hasAdminFilter) || (!this.userSearchAndFilterStructure.hasAdminFilter))) {
      this.userSearchAndFilterStructure.isAdmin = true;
      this.userSearchAndFilterStructure.hasAdminFilter = true;
      this.get_userDashboardStructure();
    }
  }

  eventHandler_searchTextChanged(searchText: string) {
    this.userSearchAndFilterStructure.searchAndFilterStructure.searchText = searchText;
    this.get_userDashboardStructure();
  }

  eventHandler_buttonClicked() {
    // ADD NAVIGATION TO NEW PROPERTY
    this.router.navigate(["/","Utilizador"]);
  }

  get_userDashboardStructure() {
    this.isDataFetched = false;
    this.queries_userService.Post_SearchAndFilter_UserStructure(this.userSearchAndFilterStructure).subscribe((data: {}) => {
      this.userDashboardStructureArray = <UserDashboardStructure[]>data;
      this.isDataFetched = true;
      this.hasPreviousPage();
      this.hasNextPage();
    }); 
  }

  previous() {
    if(this.hasPrevious) {
      this.userSearchAndFilterStructure.searchAndFilterStructure.page -= 1;

      this.get_userDashboardStructure();
    }
  }

  next() {
    if(this.hasNext) {
      this.userSearchAndFilterStructure.searchAndFilterStructure.page += 1;

      this.get_userDashboardStructure();
    }
  }

  private hasPreviousPage() {
    this.hasPrevious = this.userSearchAndFilterStructure.searchAndFilterStructure.page > 0;
  }

  private hasNextPage() {
    this.hasNext = this.userDashboardStructureArray.length == this.userSearchAndFilterStructure.searchAndFilterStructure.size;
  }

  private get_Kpis() {
    this.queries_userService.Get_Kpis().subscribe((data: {}) => {
      this.dashboardKpis = <DashboardKpiStructure[]>data;
      this.isKpiDataFetched = true;
    });
  }
}
