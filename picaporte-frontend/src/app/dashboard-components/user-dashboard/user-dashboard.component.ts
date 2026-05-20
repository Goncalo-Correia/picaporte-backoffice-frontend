import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QueriesExportService } from 'src/app/api-service/queries-export/queries-export.service';
import { QueriesUserService } from 'src/app/api-service/queries-user/queries-user.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { BaseDashboardComponent } from 'src/app/dashboard-components/shared/base-dashboard.component';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { UserDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/user/user-dashboard-search-and-filter.structure';
import { UserDashboardStructure } from 'src/app/structures/dashboard-structures/user/user-dashboard.structure';
import { ExportStructure } from 'src/app/structures/export-structure';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent extends BaseDashboardComponent implements OnInit {

  @ViewChild(MessageComponent) override messageComponent!: MessageComponent;

  dashboardKpis: DashboardKpiStructure[] = [];
  placeholderDashboardKpi: DashboardKpiStructure = new DashboardKpiStructure();

  userDashboardStructureArray: UserDashboardStructure[] = [];
  userSearchAndFilterStructure: UserDashboardSearchAndFilterStructure = new UserDashboardSearchAndFilterStructure();
  hasPrevious: boolean = true;
  hasNext: boolean = true;

  isDataFetched: boolean = false;
  isKpiDataFetched: boolean = false;

  exportStructure: ExportStructure = new ExportStructure();

  constructor(
    public queries_userService: QueriesUserService,
    private queries_export: QueriesExportService,
    public router: Router,
    authenticationService: AuthenticationService,
    @Inject(DOCUMENT) private document: Document
  ) {
    super(authenticationService);
  }

  ngOnInit(): void {
    this.get_Kpis();
    this.get_userDashboardStructure();
  }

  eventHandler_dashboardKpiClicked(index: number) {
    let didChange = false;

    if (index === 0 && this.userSearchAndFilterStructure.hasAdminFilter) {
      this.userSearchAndFilterStructure.isAdmin = false;
      this.userSearchAndFilterStructure.hasAdminFilter = false;
      didChange = true;
    }

    if (index === 1 && ((this.userSearchAndFilterStructure.isAdmin && this.userSearchAndFilterStructure.hasAdminFilter) || !this.userSearchAndFilterStructure.hasAdminFilter)) {
      this.userSearchAndFilterStructure.isAdmin = false;
      this.userSearchAndFilterStructure.hasAdminFilter = true;
      didChange = true;
    }

    if (index === 2 && ((!this.userSearchAndFilterStructure.isAdmin && this.userSearchAndFilterStructure.hasAdminFilter) || !this.userSearchAndFilterStructure.hasAdminFilter)) {
      this.userSearchAndFilterStructure.isAdmin = true;
      this.userSearchAndFilterStructure.hasAdminFilter = true;
      didChange = true;
    }

    if (didChange) {
      this.resetToFirstPage(this.userSearchAndFilterStructure.searchAndFilterStructure);
      this.get_userDashboardStructure();
    }
  }

  onClick_export() {
    this.get_export();
  }

  onClick_copy() {
    this.copyElementText(this.document, 'exportDiv');
  }

  eventHandler_searchTextChanged(searchText: string) {
    this.userSearchAndFilterStructure.searchAndFilterStructure.searchText = searchText;
    this.resetToFirstPage(this.userSearchAndFilterStructure.searchAndFilterStructure);
    this.get_userDashboardStructure();
  }

  eventHandler_buttonClicked() {
    this.router.navigate(['/', 'Utilizador']);
  }

  get_userDashboardStructure() {
    this.isDataFetched = false;
    this.runAuthenticatedRequest(
      (httpOptions) => this.queries_userService.Post_SearchAndFilter_UserStructure(this.userSearchAndFilterStructure, httpOptions),
      (data) => {
        this.userDashboardStructureArray = data as UserDashboardStructure[];
        this.isDataFetched = true;
        this.updatePaginationFlags();
      },
      () => {
        this.userDashboardStructureArray = [];
        this.isDataFetched = true;
        this.updatePaginationFlags();
      }
    );
  }

  get_export() {
    this.runAuthenticatedRequest(
      (httpOptions) => this.queries_export.ExportUsers(this.userSearchAndFilterStructure, httpOptions),
      (data) => {
        this.exportStructure = data as ExportStructure;
      }
    );
  }

  previous() {
    if (this.hasPrevious) {
      this.userSearchAndFilterStructure.searchAndFilterStructure.page -= 1;
      this.get_userDashboardStructure();
    }
  }

  next() {
    if (this.hasNext) {
      this.userSearchAndFilterStructure.searchAndFilterStructure.page += 1;
      this.get_userDashboardStructure();
    }
  }

  private updatePaginationFlags() {
    const pagination = this.updatePagination(
      this.userSearchAndFilterStructure.searchAndFilterStructure,
      this.userDashboardStructureArray.length
    );
    this.hasPrevious = pagination.hasPrevious;
    this.hasNext = pagination.hasNext;
  }

  private get_Kpis() {
    this.runAuthenticatedRequest(
      (httpOptions) => this.queries_userService.Get_Kpis(httpOptions),
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
