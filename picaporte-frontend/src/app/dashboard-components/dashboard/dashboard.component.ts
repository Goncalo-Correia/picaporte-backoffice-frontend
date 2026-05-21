import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QueriesEntityReferenceService } from 'src/app/api-service/queries-entity-reference/queries-entity-reference.service';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { BaseDashboardComponent } from 'src/app/dashboard-components/shared/base-dashboard.component';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { EntityReferenceDashboardStructure } from 'src/app/structures/dashboard-structures/entity-reference/entity-reference-dashboard.structure';
import { EntityReferenceSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/entity-reference/entity-reference-search-and-filter.structure';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseDashboardComponent implements OnInit {
  readonly propertyEntityType = 'Im\u00F3vel';
  readonly propertyEntityTypePlural = 'Im\u00F3veis';

  @ViewChild(MessageComponent) override messageComponent!: MessageComponent;

  dashboardKpis: DashboardKpiStructure[] = [];
  placeholderDashboardKpi: DashboardKpiStructure = new DashboardKpiStructure();

  entityReferenceList: EntityReferenceDashboardStructure[] = [];
  entityReferenceSearchAndFilterStructure: EntityReferenceSearchAndFilterStructure = new EntityReferenceSearchAndFilterStructure();
  hasPrevious: boolean = true;
  hasNext: boolean = true;

  isDataFetched: boolean = false;
  isKpiDataFetched: boolean = false;

  constructor(
    public queries_entityReferenceService: QueriesEntityReferenceService,
    public router: Router,
    authenticationService: AuthenticationService
  ) {
    super(authenticationService);
  }

  ngOnInit(): void {
    this.get_Kpis();
    this.get_dashboardStructure();
  }

  eventHandler_dashboardKpiClicked(clickedEntityTypeId: number) {
    if (this.entityReferenceSearchAndFilterStructure.entityTypeId != clickedEntityTypeId) {
      this.entityReferenceSearchAndFilterStructure.entityTypeId = clickedEntityTypeId;
    } else {
      this.entityReferenceSearchAndFilterStructure.entityTypeId = undefined;
    }

    this.resetToFirstPage(this.entityReferenceSearchAndFilterStructure.searchAndFilterStructure);
    this.get_dashboardStructure();
  }

  eventHandler_searchTextChanged(searchText: string) {
    this.entityReferenceSearchAndFilterStructure.searchAndFilterStructure.searchText = searchText;
    this.resetToFirstPage(this.entityReferenceSearchAndFilterStructure.searchAndFilterStructure);
    this.get_dashboardStructure();
  }

  eventHandler_buttonClicked() {
    // Dashboard search has no action button.
  }

  get_dashboardStructure() {
    this.isDataFetched = false;
    this.runAuthenticatedRequest(
      (httpOptions) => this.queries_entityReferenceService.Post_SearchAndFilter_EntityReferenceStructure(this.entityReferenceSearchAndFilterStructure, httpOptions),
      (data) => {
        this.entityReferenceList = data as EntityReferenceDashboardStructure[];
        this.isDataFetched = true;
        this.updatePaginationFlags();
      },
      () => {
        this.entityReferenceList = [];
        this.isDataFetched = true;
        this.updatePaginationFlags();
      }
    );
  }

  previous() {
    if (this.hasPrevious) {
      this.entityReferenceSearchAndFilterStructure.searchAndFilterStructure.page -= 1;
      this.get_dashboardStructure();
    }
  }

  next() {
    if (this.hasNext) {
      this.entityReferenceSearchAndFilterStructure.searchAndFilterStructure.page += 1;
      this.get_dashboardStructure();
    }
  }

  getEntityRoute(item: EntityReferenceDashboardStructure): string[] | null {
    switch (item.type) {
      case 'Cliente':
      case 'Clientes':
        return ['/Cliente/', item.recordId];
      case this.propertyEntityType:
      case this.propertyEntityTypePlural:
        return ['/Imovel/', item.recordId];
      case 'Utilizador':
      case 'Utilizadores':
        return ['/Utilizador/', item.recordId];
      default:
        return null;
    }
  }

  private updatePaginationFlags() {
    const pagination = this.updatePagination(
      this.entityReferenceSearchAndFilterStructure.searchAndFilterStructure,
      this.entityReferenceList.length
    );
    this.hasPrevious = pagination.hasPrevious;
    this.hasNext = pagination.hasNext;
  }

  private get_Kpis() {
    this.runAuthenticatedRequest(
      (httpOptions) => this.queries_entityReferenceService.Get_Kpis(httpOptions),
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
